import { DatabaseSync } from "node:sqlite";
import { Logger, LogLevel } from "../core/logging/Logger.js";
import { AtlasClient } from "./modules/client/AtlasClient.js";
import { RequestManager } from "./modules/client/Requests.js";
import { SQLDatabase } from "./modules/sql/SQL.js";

export class Atlas {
  private _client: AtlasClient;
  private _requests: RequestManager;
  private _sqlClient: SQLDatabase;
  constructor() {
    Logger.sendLog(LogLevel.Info, ["ATLAS"], "INITIALIZING ATLAS");
    this._client = new AtlasClient();
    this._sqlClient = new SQLDatabase(
      this,
      new DatabaseSync("/home/raine/Documents/Scripts/WyvernApp/Lagrange/src/lib/core/db/atlasql.db")
    );
    this._requests = new RequestManager(this);
    // once again i dont really care if this is a full path
    this._client.onPoolReady(() => { this.init() })
  }

  public get client(): AtlasClient {
    return this._client;
  }
  /**
   * Returns the class containing abstracted methods of the SQLite database connection for later extension and rewriting
   */
  public get sqlClient(): SQLDatabase {
    return this._sqlClient;
  }
  public get requests(): RequestManager {
    return this._requests;
  }

  private async init(): Promise<void> {
    const pair = this._client.pool.requestForResource();
    if (!pair) return;
    const resource = pair.resource;
    let failureCount: number = 0;

    // User table
    try {
      Logger.sendLog(LogLevel.Info, ["ATLAS", "init()"], "Setting up users table");
      await this._client.execute(resource, `
                CREATE TABLE IF NOT EXISTS users (
                    user_id bigint,
                    username text,
                    display_name text,
                    PRIMARY KEY (user_id)
                );
            `)
    } catch (e) {
      Logger.sendLog(LogLevel.Error, ["ATLAS", "init()"], "ATLAS failed to initialize the user table\n", e, "\n");
      failureCount += 1;
    }

    // guilds table
    try {
      Logger.sendLog(LogLevel.Info, ["ATLAS", "init()"], "Setting up guilds table");
      await this._client.execute(resource, `
                CREATE TABLE IF NOT EXISTS guilds (
                    guild_id text,
                    guild_name text,
                    guild_owner text,
                    PRIMARY KEY (guild_id)
                );
            `)
    } catch (e) {
      Logger.sendLog(LogLevel.Error, ["ATLAS", "init()"], "ATLAS failed to initialize the guild table\n", e, "\n");
      failureCount += 1;
    }
    // credentials
    try {
      Logger.sendLog(LogLevel.Info, ["ATLAS", "init()"], "Setting up credentials table");
      await this._client.execute(resource, `
                CREATE TABLE IF NOT EXISTS credentials (
                    user_id bigint,
                    pass text,
                    email text,
                    authkeys set<text>,
                    PRIMARY KEY (user_id)
                );
            `)
    } catch (e) {
      Logger.sendLog(LogLevel.Error, ["ATLAS", "init()"], "ATLAS failed to initialize the credentials table\n", e, "\n");
      failureCount += 1;
    }

    // channels table
    try {
      Logger.sendLog(LogLevel.Info, ["ATLAS", "init()"], "Setting up channels table");
      await this._client.execute(resource, `
                CREATE TABLE IF NOT EXISTS channels (
                    channel_id text,
                    guild_id text,
                    channel_name text,
                    PRIMARY KEY (channel_id, guild_id)
                );
            `)
    } catch (e) {
      Logger.sendLog(LogLevel.Error, ["ATLAS", "init()"], "ATLAS failed to initialize the channel table\n", e, "\n");
      failureCount += 1;
    }

    try {
      Logger.sendLog(LogLevel.Info, ["ATLAS", "init()"], "Setting up messages table");
      await this._client.execute(resource, `
                CREATE TABLE IF NOT EXISTS messages (
                    channel_id bigint,
                    message_id bigint,
                    author_id bigint,
                    content text,
                    PRIMARY KEY (channel_id, message_id)
                );
            `)
    } catch (e) {
      Logger.sendLog(LogLevel.Error, ["ATLAS", "init()"], "ATLAS failed to initialize the message table\n", e, "\n");
      failureCount += 1;
    }

    if (failureCount > 0) {
      Logger.sendLog(LogLevel.Critical, ["ATLAS", "init()"], "ATLAS encountered a fatal error during initialization and will shut down");
      throw new Error();
    }
    Logger.sendLog(LogLevel.Success, ["ATLAS", "init()"], "ATLAS tables successfully initialized");
    this._client.pool.returnResource(pair);
  }
}
