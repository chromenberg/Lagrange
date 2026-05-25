import type { ATLAS } from "../../../../common/Typings.js";
import type { Atlas } from "../../AtlasManager.js";
import { AtlasDB } from "../../Configs/Config.js";
import { GenToken } from "../crypt/Crypt.js";
import { SnowflakeNode, WorkerIDs } from "../snowflake/Snowflake.js";
import type { SQLPromise } from "../sql/SQL.js";
import type { Token } from "../Types.js";
import { toAtlasBase, hexDate } from "./Requests.js";
import { AtlasChild } from "./AtlasChild.js";

export class UserService extends AtlasChild {
  protected snowflake: SnowflakeNode;
  constructor(
    parent: Atlas, snowflake?: SnowflakeNode
  ) {
    super(parent);

    // If we havent given the user service a snowflake node already then we will generate one
    // with the defaults for a user service
    this.snowflake = snowflake ? snowflake : SnowflakeNode({
      workerBits: 10,
      workerID: WorkerIDs.USER_SERVICE,
      sequenceBits: 13,
      // user ids should be represented as strings in JS to prevent conversion
      startEpoch: AtlasDB.Snowflake.StartEpoch
    });
  }

  public newAuthToken(id: string): Token {
    return `${toAtlasBase(id)}.${hexDate()}.${GenToken(16).ToBase64Atlas()}`;
  }

  public getUserByID(id: string): SQLPromise {
    console.log(id);
    return this.parent.sqlClient.get`SELECT * FROM users, credentials WHERE users.user_id = ${BigInt(id)};`;
  }

  public getUserByUsername(username: string): SQLPromise {
    return this.parent.sqlClient.get`SELECT * FROM users WHERE username = ${username};`;
  }

  private newUser(
    id: ATLAS.Snowflake,
    username: string
  ): void {
    this.parent.sqlClient.run`INSERT INTO users VALUES (${id}, ${username}, ${username});`;
  }

  private newUserCreds(
    id: ATLAS.Snowflake,
    email: ATLAS.EmailAddress,
    password: string
  ): void {
    this.parent.sqlClient.run`INSERT INTO credentials VALUES (${id}, ${email}, ${password}, ${this.newAuthToken(id)});`;
  }

  // TODO: Reimplement
  public signUp({
    username, email, password
  }: { username: string; email: ATLAS.EmailAddress; password: string; }
  ): SQLPromise {
    console.log("Registering new user with", username, email, password);
    const id = this.snowflake.GenerateID().toString();

    const userResult = this.newUser(id, username);
    const credResult = this.newUserCreds(id, email, password);

    return this.getUserByID(id);
  }
}
