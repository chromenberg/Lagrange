import { DatabaseSync } from "node:sqlite";
import { Logger, LogLevel } from "../core/logging/Logger.js";
import { AtlasClient } from "./modules/client/AtlasClient.js";
import { RequestManager } from "./modules/Requests.js";
import { SQLDatabase } from "./modules/sql/SQL.js";
import { exec } from "child_process";
import type { Table } from "./tables/TableBuilder.js";
import { nextTick } from "process";
import { EventHandler } from "../core/structs/EventHandler.js";
import type { VoidCallback } from "../core/types/Types.js";

export class Atlas {
  private _client: AtlasClient;
  private _requests: RequestManager;
  private _sqlClient: SQLDatabase;
  private _mountQueue: Table[] = [];
  private _emitter = new EventHandler();
  constructor() {
    Logger.sendLog(LogLevel.Info, ["ATLAS"], "Initializing databases");
    this._client = new AtlasClient();
    this._sqlClient = new SQLDatabase(
      this,
      new DatabaseSync("./db/dev/server.sqlite", { readBigInts: true }),
    );
    this._requests = new RequestManager(this);

    process.emit("atlaspreinit", this);

    nextTick(() => {
      this._client.onPoolReady(() => {
        this.init();
      });
    });
  }

  public on(event: string, callback: VoidCallback): this {
    this._emitter.on(event, callback);
    return this;
  }

  public off(event: string, callback: VoidCallback): this {
    this._emitter.off(event, callback);
    return this;
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

  public mount(table: Table): this {
    this._mountQueue.push();
    try {
      Logger.sendLog(
        LogLevel.Info,
        ["ATLAS", "init()"],
        `Mounting table "${table.name}"`,
      );
      this.sqlClient.exec(table.toString());
    } catch (e) {
      Logger.sendLog(
        LogLevel.Error,
        ["ATLAS", "init()"],
        `Table "${table.name}" failed to initialize\n`,
        e,
        "\n",
      );
    }
    return this;
  }

  private async init(): Promise<void> {
    const pair = this._client.pool.requestForResource();
    if (!pair) return;
    const resource = pair.resource;
    let failureCount: number = 0;

    try {
      //? Is PK channel_id needed? message_id is always unique
      Logger.sendLog(
        LogLevel.Info,
        ["ATLAS", "init()"],
        "Setting up messages table",
      );
      await this._client.execute(
        resource,
        `
                CREATE TABLE IF NOT EXISTS messages (
                    channel_id bigint,
                    message_id bigint,
                    author_id bigint,
                    content text,
                    PRIMARY KEY (channel_id, message_id)
                );
            `,
      );
    } catch (e) {
      Logger.sendLog(
        LogLevel.Error,
        ["ATLAS", "init()"],
        "ATLAS failed to initialize the message table\n",
        e,
        "\n",
      );
      failureCount += 1;
    }

    if (failureCount > 0) {
      Logger.sendLog(
        LogLevel.Critical,
        ["ATLAS", "init()"],
        "ATLAS encountered a fatal error during initialization and will shut down",
      );
      throw new Error();
    }
    Logger.sendLog(
      LogLevel.Success,
      ["ATLAS", "init()"],
      "ATLAS tables successfully initialized",
    );
    this._client.pool.returnResource(pair);
    process.emit("atlasInit");
  }
}

process.on("exit", (e) => {
  Logger.sendLog(LogLevel.Info, ["ATLAS"], "Syncing REPL database with PROD");
  exec("cp ./db/prod/server.sqlite ./db/repl/server.sqlite").disconnect();
  // exec("cp ./db/prod/server.sqlite ./db/dev/server.sqlite").disconnect()
  process.exit(e);
});
