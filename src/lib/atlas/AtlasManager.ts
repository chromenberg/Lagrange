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
      new DatabaseSync(":memory:", {readBigInts: true})
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
      await this.sqlClient.run`
        CREATE TABLE IF NOT EXISTS users (
          user_id INTEGER PRIMARY KEY,
          username TEXT NOT NULL,
          display_name TEXT
        );`
    } catch (e) {
      Logger.sendLog(LogLevel.Error, ["ATLAS", "init()"], "ATLAS failed to initialize the user table\n", e, "\n");
      failureCount += 1;
    }

    // guilds table
    try {
      Logger.sendLog(LogLevel.Info, ["ATLAS", "init()"], "Setting up guilds table");
      await this.sqlClient.run`
        CREATE TABLE IF NOT EXISTS guilds (
            guild_id INTEGER PRIMARY KEY,
            guild_name TEXT NOT NULL,
            guild_owner INTEGER NOT NULL,
            FOREIGN KEY (guild_owner) REFERENCES users(user_id)
        );`
    } catch (e) {
      Logger.sendLog(LogLevel.Error, ["ATLAS", "init()"], "ATLAS failed to initialize the guild table\n", e, "\n");
      failureCount += 1;
    }
    // credentials
    try {
      Logger.sendLog(LogLevel.Info, ["ATLAS", "init()"], "Setting up credentials table");
      await this.sqlClient.run`
            CREATE TABLE IF NOT EXISTS credentials (
                user_id INTEGER PRIMARY KEY REFERENCES users(user_id),
                email TEXT NOT NULL,
                password TEXT NOT NULL,
                active_token TEXT NOT NULL
            );`
    } catch (e) {
      Logger.sendLog(LogLevel.Error, ["ATLAS", "init()"], "ATLAS failed to initialize the credentials table\n", e, "\n");
      failureCount += 1;
    }

    // channels table
    try {
      Logger.sendLog(LogLevel.Info, ["ATLAS", "init()"], "Setting up channels table");
      await this.sqlClient.run`
        CREATE TABLE IF NOT EXISTS channels (
            channel_id INTEGER PRIMARY KEY,
            channel_name TEXT NOT NULL
        );`
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

    try {
      Logger.sendLog(LogLevel.Info, ["ATLAS", "init()"], "Setting up guild channels table");
      await this.sqlClient.run`
              CREATE TABLE IF NOT EXISTS guild_channels (
                  channel_id INTEGER REFERENCES channels(channel_id),
                  guild_id INTEGER REFERENCES guilds(guild_id),
                  PRIMARY KEY (channel_id, guild_id)
              );
        `
    } catch (e) {
      Logger.sendLog(LogLevel.Error, ["ATLAS", "init()"], "ATLAS failed to initialize the  guild channels table\n", e, "\n");
      failureCount += 1;
    }

    try {
      Logger.sendLog(LogLevel.Info, ["ATLAS", "init()"], "Setting up user guild table");
      await this.sqlClient.run`
        CREATE TABLE IF NOT EXISTS user_guilds (
            user_id INTEGER REFERENCES users(user_id),
            guild_id INTEGER REFERENCES guilds(guild_id),  
            PRIMARY KEY (user_id, guild_id)
        );`
    } catch (e) {
      Logger.sendLog(LogLevel.Error, ["ATLAS", "init()"], "ATLAS failed to initialize the user guild table\n", e, "\n");
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
