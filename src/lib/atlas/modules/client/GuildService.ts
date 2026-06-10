import type { GuildCreateObj } from "../../../lagrange/interfaces/Guilds.js";
import type { Atlas } from "../../AtlasManager.js";
import { AtlasDB } from "../../Configs/Config.js";
import { SnowflakeNode, WorkerIDs } from "../snowflake/Snowflake.js";
import type { SQLPromiseArray } from "../../../core/types/Types.js";
import { AtlasChild } from "./AtlasChild.js";

export class GuildService extends AtlasChild {
  protected snowflake: SnowflakeNode;
  constructor(parent: Atlas, snowflake?: SnowflakeNode) {
    super(parent);

    // If we havent given the user service a snowflake node already then we will generate one
    // with the defaults for a user service
    this.snowflake = snowflake
      ? snowflake
      : SnowflakeNode({
          workerBits: 10,
          workerID: WorkerIDs.GUILD_SERVICE,
          sequenceBits: 13,
          // user ids should be represented as strings in JS to prevent conversion
          startEpoch: AtlasDB.Snowflake.StartEpoch,
        });
  }

  public async getAllGuilds(): SQLPromiseArray {
    return this.parent.sqlClient.all`SELECT * FROM guilds`;
  }

  public async newGuild(data: GuildCreateObj): Promise<void> {
    // this.parent.sqlClient
    //   .run`INSERT INTO guilds (${this.snowflake.GenerateID().toString()}, 
    //                           ${data.name})`;
  }
}
