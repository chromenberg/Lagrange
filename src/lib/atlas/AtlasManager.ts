import { DatabaseSync } from "node:sqlite";
import { Logger, LogLevel } from "../core/logging/Logger.js";
import { AtlasClient } from "./modules/client/AtlasClient.js";
import { RequestManager } from "./modules/client/Requests.js";
import { SQLDatabase } from "./modules/sql/SQL.js";
import { exec } from "child_process";

export class Atlas {
  private _client: AtlasClient;
  private _requests: RequestManager;
  private _sqlClient: SQLDatabase;
  constructor() {
    Logger.sendLog(LogLevel.Info, ["ATLAS"], "Initializing databases");
    this._client = new AtlasClient();
    this._sqlClient = new SQLDatabase(
      this,
      new DatabaseSync("./db/dev/server.sqlite", {readBigInts: true})
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
          email TEXT NOT NULL,
          password TEXT NOT NULL,
          token TEXT NOT NULL,
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
            owner_id INTEGER NOT NULL,
            guild_name TEXT NOT NULL,
            FOREIGN KEY (owner_id) REFERENCES users(user_id)
        );`
    } catch (e) {
      Logger.sendLog(LogLevel.Error, ["ATLAS", "init()"], "ATLAS failed to initialize the guild table\n", e, "\n");
      failureCount += 1;
    }
    // credentials
    // try {
    //   Logger.sendLog(LogLevel.Info, ["ATLAS", "init()"], "Setting up credentials table");
    //   await this.sqlClient.run`
    //         CREATE TABLE IF NOT EXISTS credentials (
    //             user_id INTEGER PRIMARY KEY REFERENCES users(user_id),
                
    //         );`
    // } catch (e) {
    //   Logger.sendLog(LogLevel.Error, ["ATLAS", "init()"], "ATLAS failed to initialize the credentials table\n", e, "\n");
    //   failureCount += 1;
    // }

    // channels table
    try {
      Logger.sendLog(LogLevel.Info, ["ATLAS", "init()"], "Setting up channels table");
      await this.sqlClient.run`
        CREATE TABLE IF NOT EXISTS channels (
            channel_id INTEGER PRIMARY KEY,
            guild_id INTEGER NOT NULL,
            channel_name TEXT NOT NULL,
            channel_index INTEGER,
            FOREIGN KEY (guild_id) REFERENCES guilds(guild_id)
        );`
    } catch (e) {
      Logger.sendLog(LogLevel.Error, ["ATLAS", "init()"], "ATLAS failed to initialize the channel table\n", e, "\n");
      failureCount += 1;
    }

    try {
      //? Is PK channel_id needed? message_id is always unique
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
      Logger.sendLog(LogLevel.Info, ["ATLAS", "init()"], "Setting up roles table");
      await this.sqlClient.run`
              CREATE TABLE IF NOT EXISTS guild_roles (
                  role_id INTEGER PRIMARY KEY,
                  guild_id INTEGER,
                  role_name text,
                  role_color INTEGER,
                  role_index INTEGER,
                  permissions BINARY,
                  hoist BOOL,
                  mentionable BOOL,
                  FOREIGN KEY (guild_id) REFERENCES guilds(guild_id)
              );
        `
    } catch (e) {
      Logger.sendLog(LogLevel.Error, ["ATLAS", "init()"], "ATLAS failed to initialize the roles table\n", e, "\n");
      failureCount += 1;
    }

    try {
      Logger.sendLog(LogLevel.Info, ["ATLAS", "init()"], "Setting up guild members table");
      await this.sqlClient.run`
        CREATE TABLE IF NOT EXISTS guild_members (
            user_id INTEGER REFERENCES users(user_id),
            guild_id INTEGER REFERENCES guilds(guild_id),
            nickname text,
            PRIMARY KEY (user_id, guild_id)
        );`
    } catch (e) {
      Logger.sendLog(LogLevel.Error, ["ATLAS", "init()"], "ATLAS failed to initialize the guild members table\n", e, "\n");
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

process.on("exit", (e) => {
  Logger.sendLog(LogLevel.Info, ["ATLAS"], "Syncing REPL database with PROD")
  exec("cp ./db/prod/server.sqlite ./db/repl/server.sqlite").disconnect()
  // exec("cp ./db/prod/server.sqlite ./db/dev/server.sqlite").disconnect()
  process.exit(e)
})
