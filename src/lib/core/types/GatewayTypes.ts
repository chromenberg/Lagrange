import type {
  GatewayEventOpCodes,
  GatewayEventTypes,
} from "../../lagrange/modules/events/GatewayEvents.js";
import { NamedEvent } from "../../lagrange/modules/events/NamedEvent.js";
import type { ClientConnection } from "../../lagrange/modules/gateway/Connection.js";

export type EventOrOpcode = typeof GatewayEventOpCodes &
  typeof GatewayEventTypes;
export type KeyOfEvents = keyof typeof GatewayEventTypes;
export type NamedEventCallback = (
  data: any,
  sequence?: number
) => NamedEvent;
export type EventTypeCallbacks = {
  [keys in keyof typeof GatewayEventTypes & ""]: NamedEventCallback | undefined;
};
export type GuildChannel = {
  guild_id: bigint;
  channel_id: bigint;
};
