import type { ChannelData } from "../../../core/types/FeatureTypes.js";
import type { Snowflake } from "../../../core/types/Types.js";
import type { Atlas } from "../../AtlasManager.js";
import { AtlasDB } from "../../Configs/Config.js";
import { SnowflakeNode, WorkerIDs } from "../snowflake/Snowflake.js";
import { AtlasService } from "../client/AtlasChild.js";
import { AtlasEvents } from "../../AtlasEvents.js";

export class ChannelService extends AtlasService {
  protected snowflake: SnowflakeNode;
  constructor(parent: Atlas, snowflake?: SnowflakeNode) {
    super(parent);

    // If we havent given the user service a snowflake node already then we will generate one
    // with the defaults for a user service
    this.snowflake = snowflake
      ? snowflake
      : SnowflakeNode({
          workerBits: 10,
          workerID: WorkerIDs.CHANNEL_SERVICE,
          sequenceBits: 13,
          // user ids should be represented as strings in JS to prevent conversion
          startEpoch: AtlasDB.Snowflake.StartEpoch,
        });
  }
  
  public async newChannel(channelData: ChannelData, guildID: Snowflake) {
    channelData.id = this.snowflake.GenerateID().toString();
    this.parent.sqlClient
      .run`INSERT INTO channels VALUES (${BigInt(channelData.id)}, ${BigInt(guildID)}, ${channelData.name}, ${channelData.channel_index}, null, null, null);`;
    
    // this.parent.emit(AtlasEvents.channelCreate, guildID, channelData.id)
    
    return channelData
  }

}
