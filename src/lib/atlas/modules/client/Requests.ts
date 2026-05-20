import { Logger, LogLevel } from "../../../../../../Common/Logging/dist/Logger.js";
import type { ATLAS } from "../../../../common/Typings.js";
import { Atlas } from "../../AtlasManager.js";
import { AtlasDB } from "../../Configs/Config.js";
import type { PoolItemPair } from "../pooling/Pool.js";
import { PoolResourceNotSentError } from "../pooling/PoolErrors.js";
import { SnowflakeNode, WorkerIDs } from "../snowflake/Snowflake.js";

class AtlasChild {
  protected parent: Atlas;
  constructor(parent: Atlas) {
    this.parent = parent;
  }
}


export class RequestBuilder extends AtlasChild {
  private connection: PoolItemPair;
  private returned: boolean = false;
  constructor(parent: Atlas, connection?: PoolItemPair) {
    super(parent);

    if (connection) {
      this.connection = connection;
    } else {
      const resource = this.parent.client.requestResource();

      if (!resource) {
        Logger.sendLog(
          LogLevel.Error, ["ATLAS", "AtlasClient", "Requests"],
          "No resource was returned during the construction of a RequestBuilder"
        );
        throw new PoolResourceNotSentError("No pooling resource was sent during the construction of a RequestBuilder");
      }
      this.connection = resource;
    }
  }

  public async request(...args: any[]): ATLAS.ResultSet {
    // send the connection to atlas so no extra connection is used
    return this.parent.client.execute(this.connection, args.join(" ") + ";");
  }

  public async filteringRequest(...args: any[]): ATLAS.ResultSet {
    return this.request(args, "ALLOW FILTERING");
  }

  public return(): void {
    this.parent.client.returnResource(this.connection);
    this.returned = true;
  }

  [Symbol.dispose]() {
    if (!this.returned) {
      Logger.sendLog(
        LogLevel.Critical, ["ATLAS", "AtlasClient", "RequestBuilder"],
        "SAFEGUARD: The connection was not returned before going out of scope",
        "this will create unusable pool connections.",
        "\n",
        "SAFEGUARD: Automatically returning connection to prevent leaks."
      );

      this.return();
    }
  }
}


class UserService extends AtlasChild {
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

  public getUserByID(id: string) {
    using req = new RequestBuilder(this.parent);
    const res = req.filteringRequest("SELECT * FROM users WHERE user_id = " + id);
  }

  private newUser(
    conn: RequestBuilder,
    id: ATLAS.Snowflake,
    username: string
  ): ATLAS.ResultSet {
    
    return conn.request(`INSERT INTO users (user_id, username, display_name)
      VALUES (${id}, '${username}', '${username}')`);
  }

  private newUserCreds(
    conn: RequestBuilder,
    id: ATLAS.Snowflake,
    email: ATLAS.EmailAddress,
    password: string
  ): ATLAS.ResultSet {
    
    return conn.request(`INSERT INTO credentials (user_id, email, pass)
      VALUES (${id}, '${email}', '${password}')`);
  }

  public signUp({
    username,
    email,
    password
  }: { username: string, email: ATLAS.EmailAddress, password: string }
  ): any[] {
    using req = new RequestBuilder(this.parent);
    const id = this.snowflake.GenerateID().toString();
    
    const userResult = this.newUser(req, id, username);
    const credResult = this.newUserCreds(req, id, email, password);
    
    req.return();

    return [userResult, credResult];
  }
}

// /users/@me - some service dedicated to the user making it
// /users/:id/profile - getProfile
// /users/
class MessageService extends AtlasChild {

}

class GuildService extends AtlasChild {

}

export class RequestManager {
  public readonly users: UserService;
  constructor(
    private parent: Atlas
  ) {
    this.users = new UserService(this.parent);
  }
}
