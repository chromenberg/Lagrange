import type { Atlas } from "../../AtlasManager.js";
import { AtlasDB } from "../../Configs/Config.js";
import {
  SnowflakeNode,
  WorkerIDs,
  type Snowflake,
} from "../snowflake/Snowflake.js";
import { AtlasService } from "../client/AtlasChild.js";

// /users/@me - some service dedicated to the user making it
// /users/:id/profile - getProfile
// /users/
export class MessageService extends AtlasService {
  protected snowflake: SnowflakeNode;
  constructor(parent: Atlas, snowflake?: SnowflakeNode) {
    super(parent);

    // If we havent given the user service a snowflake node already then we will generate one
    // with the defaults for a user service
    this.snowflake = snowflake
      ? snowflake
      : SnowflakeNode({
          workerBits: 10,
          workerID: WorkerIDs.MESSAGE_SERVICE,
          sequenceBits: 13,
          // user ids should be represented as strings in JS to prevent conversion
          startEpoch: AtlasDB.Snowflake.StartEpoch,
        });
  }

  public requestMessageID(): Snowflake {
    return this.snowflake.GenerateID();
  }
}
