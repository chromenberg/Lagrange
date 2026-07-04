import type {
  GatewayEventOpCodes,
  GatewayEventTypes,
} from "../../lagrange/modules/events/GatewayEvents.js";
import { NamedEvent } from "../../lagrange/modules/events/NamedEvent.js";
import type { ClientConnection } from "../../lagrange/modules/gateway/Connection.js";
import type { Snowflake, User } from "./Types.js";

/**
 * Merges {@link GatewayEventTypes} and {@link GatewayEventOpCodes}
 */
export type EventOrOpcode = typeof GatewayEventOpCodes &
  typeof GatewayEventTypes;

/**
 * Keys of every named gateway event
 */
export type KeyOfEvents = keyof typeof GatewayEventTypes;

/**
 * Defines the callback used for named event construction for listeners
 */
export type NamedEventCallback = (data: any, sequence?: number) => NamedEvent;
export type EventTypeCallbacks = {
  [keys in keyof typeof GatewayEventTypes & ""]: NamedEventCallback | undefined;
};

// --- Internal Types (Like guilds, channels, etc...)

export type GuildChannel = {
  guild_id: bigint;
  channel_id: bigint;
};

export type UnavailableID = {
  id: Snowflake;
  unavailable: boolean;
};

export type ReadyUserObj = {
  guilds: UnavailableID[];
  user: User & { email: string };
};

export enum EventMode {
  Guild,
  Channel,
  User,
}
