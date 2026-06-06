import type { ATLAS } from "../../../../common/Typings.js";
import type { Atlas } from "../../AtlasManager.js";
import { AtlasDB } from "../../Configs/Config.js";
import { GenToken } from "../crypt/Crypt.js";
import { SnowflakeNode, WorkerIDs } from "../snowflake/Snowflake.js";
import type { SQLPromise } from "../sql/SQL.js";
import type { SignupResponse, Token, UserSignupData } from "../Types.js";
import { toAtlasBase, hexDate } from "./Requests.js";
import { AtlasChild } from "./AtlasChild.js";
import { createHmac, scryptSync } from "crypto";

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

  public newAuthToken(id: string): Token {
    const date = hexDate();
    console.log(date);

    // create hmac with sha256, set password to db pass
    // with no salting and a target length of 32 char
    // update hmac to have the contents of the token
    // convert to b64url
    return `${toAtlasBase(id)}.${date}.${createHmac(
      "sha256",
      scryptSync(AtlasDB.Auth.password, "", 32),
    )
      .update(GenToken(16).ToBase64Atlas())
      .digest("base64url")}`;
  }

  public getUserByID(id: string): SQLPromise {
    console.log(id);
    return this.parent.sqlClient
      .get`SELECT * FROM users, credentials WHERE users.user_id = ${BigInt(id)};`;
  }

  public getUserByUsername(username: string): SQLPromise {
    return this.parent.sqlClient
      .get`SELECT * FROM users WHERE username = ${username};`;
  }

  private newUser(args: UserSignupData): SignupResponse {
    // generate new user id
    const id = this.snowflake.GenerateID().toString();
    const token = this.newAuthToken(id);
    console.log(id, token)
    this.parent.sqlClient.run`INSERT INTO users VALUES (${id},
      ${args.username /* Username */},
      ${args.username /* Display Name */},
      ${args.email},
      ${args.password},
      ${token /* token */});`;

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
    email: ATLAS.EmailAddress;
    password: string;
  }): SQLPromise {
    const userResult = this.newUser({
      username,
      email,
      password,
    });

    return this.getUserByID(userResult.user_id);
  }
}
