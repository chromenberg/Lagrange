import type { Channel } from "./ChannelTypes";
import type { NamedWithID } from "./Generics";

export type GuildChannel = {
  guild_id: string
  channel_id: string
}

export type Guild = NamedWithID<{
  channels: Channel[];
}>;

/**
 * Defines the type of data that is stored within the GuildStore
 * 
 * Stores a list of guilds
 */
export type GuildStore = Guild[];
