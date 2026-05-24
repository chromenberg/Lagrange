import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import type { ATLAS } from "../../../../common/Typings.js";
import { Atlas } from "../../AtlasManager.js";
import { AtlasDB } from "../../Configs/Config.js";
import type { PoolItemPair } from "../pooling/Pool.js";
import { PoolResourceNotSentError } from "../pooling/PoolErrors.js";
import { SnowflakeNode, WorkerIDs } from "../snowflake/Snowflake.js";
import { SQLDatabase, type SQLPromise } from "../sql/SQL.js";

class AtlasChild {
  protected parent: Atlas;
  constructor(parent: Atlas) {
    this.parent = parent;
  }
}

/**
 * A Request builder that auto returns and provides abstracted methods for creating requests.
 * 
 * This operates on the ATLAS NoSQL Database system
 */
export class RequestBuilder extends AtlasChild {
  private connection: PoolItemPair;
  private returned: boolean = false;
  constructor(parent: Atlas, connection?: PoolItemPair) {
    super(parent);

    if (connection) {
      this.connection = connection;
    } else {
      // request for a connection from the database
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

  public getUserByID(id: string): SQLPromise {
    return this.parent.sqlClient.get`SELECT * FROM users WHERE user_id = ${id};`;
  }

  public getUserByUsername(username: string): SQLPromise {
    return this.parent.sqlClient.get`SELECT * FROM users WHERE username = ${username};`;
  }
  
  private newUser(
    id: ATLAS.Snowflake,
    username: string
  ): void {
    this.parent.sqlClient.run`INSERT INTO users VALUES (${id}, '${username}', '${username}');`;
  }

  private newUserCreds(
    id: ATLAS.Snowflake,
    email: ATLAS.EmailAddress,
    password: string
  ): void {
    this.parent.sqlClient.run`INSERT INTO credentials VALUES (${id}, '${email}', '${password}', 'activetokenplaceholder');`;    
  }

  // TODO: Reimplement
  public signUp({
    username,
    email,
    password
  }: { username: string, email: ATLAS.EmailAddress, password: string }
  ): SQLPromise {
    console.log("Registering new user with", username, email, password)
    const id = this.snowflake.GenerateID().toString();
    
    const userResult = this.newUser(id, username);
    const credResult = this.newUserCreds(id, email, password);

    return this.getUserByID(id);
  }
}

// /users/@me - some service dedicated to the user making it
// /users/:id/profile - getProfile
// /users/
class MessageService extends AtlasChild {
  protected snowflake: SnowflakeNode;
  constructor(
    parent: Atlas, snowflake?: SnowflakeNode
  ) {
    super(parent);

    // If we havent given the user service a snowflake node already then we will generate one
    // with the defaults for a user service
    this.snowflake = snowflake ? snowflake : SnowflakeNode({
      workerBits: 10,
      workerID: WorkerIDs.MESSAGE_SERVICE,
      sequenceBits: 13,
      // user ids should be represented as strings in JS to prevent conversion
      startEpoch: AtlasDB.Snowflake.StartEpoch
    });
  }
}

class ChannelService extends AtlasChild {
  protected snowflake: SnowflakeNode;
  constructor(
    parent: Atlas, snowflake?: SnowflakeNode
  ) {
    super(parent);

    // If we havent given the user service a snowflake node already then we will generate one
    // with the defaults for a user service
    this.snowflake = snowflake ? snowflake : SnowflakeNode({
      workerBits: 10,
      workerID: WorkerIDs.CHANNEL_SERVICE,
      sequenceBits: 13,
      // user ids should be represented as strings in JS to prevent conversion
      startEpoch: AtlasDB.Snowflake.StartEpoch
    });
  }
}

class GuildService extends AtlasChild {
  protected snowflake: SnowflakeNode;
  constructor(
    parent: Atlas, snowflake?: SnowflakeNode
  ) {
    super(parent);

    // If we havent given the user service a snowflake node already then we will generate one
    // with the defaults for a user service
    this.snowflake = snowflake ? snowflake : SnowflakeNode({
      workerBits: 10,
      workerID: WorkerIDs.GUILD_SERVICE,
      sequenceBits: 13,
      // user ids should be represented as strings in JS to prevent conversion
      startEpoch: AtlasDB.Snowflake.StartEpoch
    });
  }
}


export class RequestManager {
  private readonly _users: UserService;
  private readonly _messages: MessageService;
  private readonly _guilds: GuildService;
  private readonly _channels: ChannelService;
  constructor(
    private parent: Atlas
  ) {
    
    this._users = new UserService(this.parent);
    this._messages = new MessageService(this.parent);
    this._guilds = new GuildService(this.parent);
    this._channels = new ChannelService(this.parent);
  }

  public get users(): UserService {
    return this._users;
  }
  public get guilds(): GuildService {
    return this._guilds;
  }
  public get channels(): ChannelService {
    return this._channels;
  }
  public get messages(): MessageService {
    return this._messages;
  }
}
