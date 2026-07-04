import type { ChannelData, GuildData } from "../../../core/types/FeatureTypes.js";
import { Templates, type Snowflake } from "../../../core/types/Types.js";
import { BaseTemplate } from "./BaseTemplate.js";

export class GuildTemplate extends BaseTemplate<GuildData> {
  constructor(guildID: Snowflake, ownerID: Snowflake, startChannel: ChannelData[], name: string) {
    super();
    this.setValue("id", guildID)
    this.setValue("owner_id", ownerID)
    this.setValue("name", name)
    this.setValue("channels", startChannel)
    this.setValue("roles", [
      Templates.roles.everyone
    ])
  }
}
