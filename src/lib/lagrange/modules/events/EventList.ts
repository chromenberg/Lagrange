import type { EventTypeCallbacks } from "../../../core/types/GatewayTypes.js";
import { NamedEvent } from "./NamedEvent.js";

// TODO: Combine them together and filter them based off of an event listener type

export const guildListeners: EventTypeCallbacks = {
  GUILD_CREATE: (data: any, sequence?: number) => {
    return new NamedEvent("GUILD_CREATE", data, sequence);
  },
  CHANNEL_CREATE: (data: any, sequence?: number) => {
    return new NamedEvent("CHANNEL_CREATE", data, sequence);
  },
  GUILD_MEMBER_ADD: (data: any, sequence?: number) => {
    return new NamedEvent("GUILD_MEMBER_ADD", data, sequence);
  },
};

export const channelListeners = {
  MESSAGE_CREATE: (data: any, sequence?: number) => {
    return new NamedEvent("MESSAGE_CREATE", data, sequence);
  },
  MESSAGE_DELETE: (data: any, sequence?: number) => {
    return new NamedEvent("MESSAGE_DELETE", data, sequence);
  },
};