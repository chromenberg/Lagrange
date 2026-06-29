import type {
  EventTypeCallbacks,
  GuildChannel,
  KeyOfEvents,
  NamedEventCallback,
} from "../../../core/types/GatewayTypes.js";
import type { GatewayEventTypes } from "../events/GatewayEvents.js";
import { NamedEvent } from "../events/NamedEvent.js";
import type { ClientConnection } from "../gateway/Connection.js";
import { GatewayEmitter } from "../gateway/Gateway.js";

function getChannelAndGuild(guildChannel: GuildChannel) {
  return [guildChannel.guild_id.toString(), guildChannel.channel_id.toString()];
}

const listeners: EventTypeCallbacks = {
  MESSAGE_CREATE: (data: any, sequence?: number) => {
    return new NamedEvent("MESSAGE_CREATE", data, sequence);
  },
  GUILD_CREATE: (data: any, sequence?: number) => {
    return new NamedEvent("GUILD_CREATE", data, sequence);
  },
  CHANNEL_CREATE: (data: any, sequence?: number) => {
    return new NamedEvent("CHANNEL_CREATE", data, sequence);
  },
  GUILD_MEMBER_ADD: (data: any, sequence?: number) => {
    return new NamedEvent("GUILD_MEMBER_ADD", data, sequence);
  },
  MESSAGE_DELETE: (data: any, sequence?: number) => {
    return new NamedEvent("MESSAGE_DELETE", data, sequence);
  },
};

export function initEvents(
  client: ClientConnection,
  guildChannels: GuildChannel[] | undefined,
) {
  // For now we will subscribe to every event type
  if (!guildChannels) return;
  
  Object.entries(listeners).forEach(([event, listener]) => {
    guildChannels.forEach((guildChannel) => {
      const [guildID, channelID] = getChannelAndGuild(guildChannel);
      if (!guildID || !channelID) return;

      GatewayEmitter.channelSubscribe(event as KeyOfEvents, guildID, channelID, (data) => {
        client.send((listener as NamedEventCallback)(data).createJSON())
      });
    });
  });
}