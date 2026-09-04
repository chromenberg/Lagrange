import type { IDIndexedItem, Snowflake } from "./Types.js";

export type ChannelData = {
  permissions?: string;
  channel_index: number;
} & IDIndexedItem;

export type RoleData = {
  color: number
  hoist: boolean
  mentionable: boolean
  permissions: string
} & IDIndexedItem;

export type GuildData = {
  owner_id: Snowflake;
  channels: ChannelData[];
  roles: RoleData[];
} & IDIndexedItem;