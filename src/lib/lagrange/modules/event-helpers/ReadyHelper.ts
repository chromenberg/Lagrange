import type {
  EventTypeCallbacks,
  GuildChannel,
  KeyOfEvents,
  NamedEventCallback,
} from "../../../core/types/GatewayTypes.js";
import type { UnavailableID } from "../../../core/types/GuildTypes.js";
import type { GatewayEventTypes } from "../events/GatewayEvents.js";
import { NamedEvent } from "../events/NamedEvent.js";
import type { ClientConnection } from "../gateway/Connection.js";
import { GatewayEmitter } from "../gateway/Gateway.js";

function getChannelAndGuild(guildChannel: GuildChannel) {
  return [guildChannel.guild_id.toString(), guildChannel.channel_id.toString()];
}

const guildListeners: EventTypeCallbacks = {
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

const channelListeners = {
  MESSAGE_CREATE: (data: any, sequence?: number) => {
    return new NamedEvent("MESSAGE_CREATE", data, sequence);
  },
  MESSAGE_DELETE: (data: any, sequence?: number) => {
    return new NamedEvent("MESSAGE_DELETE", data, sequence);
  },
};

export function initEvents(
  client: ClientConnection,
  guildChannels: GuildChannel[] | undefined,
  guilds: UnavailableID[],
) {
  // For now we will subscribe to every event type
  if (!guildChannels) return;

  Object.entries(channelListeners).forEach(([event, listener]) => {
    guildChannels.forEach((guildChannel) => {
      const [guildID, channelID] = getChannelAndGuild(guildChannel);
      if (!guildID || !channelID) return;

      // Subscribe to events from the channel
      GatewayEmitter.channelSubscribe(
        event as KeyOfEvents, // Event as found from the object entries
        guildID,
        channelID,
        (data) => {
          client.send((listener as NamedEventCallback)(data).createJSON());
        },
      );
    });
  });

  Object.entries(guildListeners).forEach(([event, listener]) => {
    guilds.forEach((item) => {
      GatewayEmitter.guildSubscribe(item.id, (data) => {
        (listener as NamedEventCallback)(data).createJSON();
      });
    });
  });
}
