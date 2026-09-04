import type { UserChannel } from "../../../core/types/ChannelTypes.js";
import type { Guild } from "../../../core/types/GuildTypes.js";
import type { ClientUser, Member, UserRelationship } from "../../../core/types/UserTypes.js";
import { BaseDispatchEvent } from "./BaseDispatchEvent.js";

export interface ReadyEventData {
  guilds: Guild[]
  merged_members: Member[][]
  private_channels: UserChannel[]
  relationships: UserRelationship[]
  user: ClientUser
}

export class ReadyEvent extends BaseDispatchEvent {
  constructor(data: ReadyEventData) {
    super("READY", data)
  }
}