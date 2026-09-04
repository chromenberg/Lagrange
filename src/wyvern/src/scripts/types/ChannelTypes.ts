/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { User } from "./UserTypes";

// @ts-ignore
export enum ChannelType {
  GuildText,
  DM,
  GuildVoice,
  GroupDM,
  GuildCategory,
  GuildAnnouncement,
}

export interface DMChannel {
  flags: number;
  id: string;
  last_message_id: string;
  last_pin_timestamp?: Date;
  recipients: User[];
  type: ChannelType;
}

export interface GroupChannel extends DMChannel {
  name: string;
  owner_id: string;
  icon: string;
}

export type UserChannel = DMChannel | GroupChannel;

export interface ChannelPermission {
  /**
   * Bitfield containing the permissions that are allowed
   */
  allow: string;
  /**
   * Bitfield containing the permissions that are forbidden
   */
  deny: string;
  /**
   * Unknown
   */
  id: string;
  /**
   * Unknown
   */
  type: number;
}

export interface BaseChannel {
  /**
   * The name that the channel will be shown with
   */
  name: string;
  /**
   * Channel ID, created by the database
   *
   * Client route: `/channels/<guild_id>/<channel_id>`
   */
  id: string;
  /**
   * ID of the guild this channel belongs to
   */
  guild_id: string;
  /**
   * The position this channel will be shown in the channels list to the user
   */
  position: number;
  /**
   * Special flags for the channel
   */
  flags: number;
  /**
   * The type of channel as shown by a number
   */
  type: number;
  permission_overwrites: ChannelPermission[];
}

/**
 * A channel that organises multiple channels within it
 */
export type CategoryChannel = BaseChannel;

/**
 * Any channel that can have messages sent inside
 */
export interface MessageableChannel extends BaseChannel {
  last_message_id: string;
  parent_id: string; // ID of category channel is in
  topic: string;
}

/**
 * Standard Text Channel
 *
 * @extends MessageableChannel
 */
export interface TextChannel extends MessageableChannel {
  last_pin_timestamp: string;
}

export type Channel =
  TextChannel | MessageableChannel  | CategoryChannel;

export type PartialChannel = Partial<
  TextChannel & MessageableChannel & GroupChannel & DMChannel & CategoryChannel
> & {
  type: number;
  id: string;
};
