import { Atlas } from "../../../../_Init.js";
import type {
  ChannelData,
  GuildData,
} from "../../../core/types/FeatureTypes.js";
import { Templates, type Snowflake } from "../../../core/types/Types.js";
import { AtlasEvents } from "../../AtlasEvents.js";
import { BaseTemplate } from "./BaseTemplate.js";

export class GuildTemplate extends BaseTemplate<GuildData> {
  constructor(
    guildID: Snowflake,
    ownerID: Snowflake,
    startChannel: ChannelData[],
    name: string,
  ) {
    // this has the type of Guild
    super();
    this.setValue("id", guildID);
    // @ts-ignore
    this.setValue("properties", {
      name: name,
      owner_id: ownerID,
      icon: null,
    });
    this.setValue("channels", startChannel);
    this.setValue("roles", [Templates.roles.everyone]);

    Atlas.emit(AtlasEvents.guildCreate, ownerID, guildID);
    startChannel.forEach((channel) => {
      Atlas.emit(AtlasEvents.channelCreate, ownerID, guildID, channel.id);
    });
  }
}
