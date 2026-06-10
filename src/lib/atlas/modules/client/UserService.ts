import type {
  EmailAddress,
  SignupResponse,
  Snowflake,
  SQLPromise,
  Token,
  UserSignupData,
} from "../../../core/types/Types.js";
import type { Atlas } from "../../AtlasManager.js";
import { AtlasDB } from "../../Configs/Config.js";
import { GenToken } from "../crypt/Crypt.js";

// TODO: Unify some of these imports

import { SnowflakeNode, WorkerIDs } from "../snowflake/Snowflake.js";
import { SQLDatabase } from "../sql/SQL.js";
import { toAtlasBase, hexDate } from "./Requests.js";
import { AtlasChild } from "./AtlasChild.js";

import { createHmac, scryptSync } from "crypto"; // TODO: this could be something to make in rust
import { DBErrors } from "../../../core/errors/DBErrors.js";

// TODO: reduce import counts

export class UserService extends AtlasChild {
  protected snowflake: SnowflakeNode;
  constructor(parent: Atlas, snowflake?: SnowflakeNode) {
    super(parent);

    // If we havent given the user service a snowflake node already then we will generate one
    // with the defaults for a user service
    this.snowflake = snowflake
      ? snowflake
      : SnowflakeNode({
          workerBits: 10,
          workerID: WorkerIDs.USER_SERVICE,
          sequenceBits: 13,
          // user ids should be represented as strings in JS to prevent conversion
          startEpoch: AtlasDB.Snowflake.StartEpoch,
        });
  }
  public newUserID(): Snowflake {
    return this.snowflake.GenerateID().toString();
  }
  public newAuthToken(id: string): Token {
    // TODO: move this to a WASM like go or rust, took 14 fucking seconds to make 500 tokens
    // create hmac with sha256, set password to db pass
    // with no salting and a target length of 32 char
    // update hmac to have the contents of the token
    // convert to b64url
    return `${toAtlasBase(id)}.${hexDate()}.${createHmac(
      "sha256",
      scryptSync(AtlasDB.Auth.password, "", 32),
    )
      .update(GenToken(16).ToBase64Atlas())
      .digest("base64url")}`;
  }

  public getUserByID(id: string): SQLPromise {
    // We convert the id from string -> bigint so the database can read it
    // this is also because by nature all IDs are generated as a bigint
    // within the goroutine that is used
    return this.parent.sqlClient
      .get`SELECT * FROM users WHERE user_id = ${BigInt(id)};`;
  }

  public getUserByUsername(username: string): SQLPromise {
    return this.parent.sqlClient
      .get`SELECT * FROM users WHERE username = ${username};`;
  }
  public getUserIDByUsername(username: string): SQLPromise {
    return this.parent.sqlClient
      .get`SELECT user_id FROM users WHERE username = ${username};`;
  }
  public async checkUsernameAvailability(username: string): Promise<boolean> {
    return new Promise((res, err) => {
      this.getUserIDByUsername(username).then((user) => {
        if (!user) {
          // if undefined, no user exists, valid name
          res(true);
          return;
        }

        res(false);
      });
    });
  }
  private newUser(args: UserSignupData): SignupResponse {
    // generate new user id
    const id = this.snowflake.GenerateID().toString();
    const token = this.newAuthToken(id);

    // inserts a new user into the database, nullable content last
    // id, email, password, token, username, display_name?
    this.parent.sqlClient.run`INSERT INTO users VALUES (${id},
      ${args.email},
      ${args.password},
      ${token /* token */},
      ${args.username /* Username */},
      ${args.username /* Display Name */});`;

    return {
      user_id: id,
      token: token,
    };
  }

  // TODO: Reimplement
  public signUp({
    username,
    email,
    password,
  }: {
    username: string;
    email: EmailAddress;
    password: string;
  }): SQLPromise {
    return new Promise((res, err) => {
      const userResult = this.newUser({
        username,
        email,
        password,
      });

      // TODO: make toSafeJS used in all requests
      // instead of manually needing to run it
      this.getUserByID(userResult.user_id).then((user) => {
        if (!user) {
          res({ message: DBErrors.NoDataReturned });
          return;
        }
        res(SQLDatabase.toSafeJS(user));
      });
    });
  }
}
