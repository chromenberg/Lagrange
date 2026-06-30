type NamedWithID<T> = T & { name: string; id: string };

type Channel = NamedWithID<{
  index: number;
}>;
type Guild = NamedWithID<{
  channels: Channel[];
}>;
type GuildMembers = {
  id: string;
  members: string[];
};
type GuildChannels = {
  guild_id: string
  channels: Channel[]
}

/**
 * Defines the type of data that is stored within the GuildStore
 * 
 * Stores a list of guilds
 */
export type GuildStore = Guild[];


/**
 * Defines the type of data that is stored within the GuildMemberStore
 *
 * Stores a list of user ids of members within a guild, organised by guild id 
 */
export type GuildMemberStore = {
  guildMembers: GuildMembers[];
};

/**
 * Defines the type of data that is stored within the ChannelStore
 * 
 * Stores a list of channels within a server, organised by guild id
 */
export type ChannelStore = {
  channels: GuildChannels[]
}
