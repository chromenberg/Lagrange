import type {
  EventTypeCallbacks,
  GuildChannel,
  KeyOfEvents,
  NamedEventCallback,
} from "../../../core/types/GatewayTypes.js";
import type { UnavailableID } from "../../../core/types/GatewayTypes.js";
import type { Guild } from "../../../core/types/GuildTypes.js";
import type { WeakObj } from "../../../core/types/Types.js";
import { channelListeners, guildListeners } from "../events/EventList.js";
import type { GatewayEventTypes } from "../events/GatewayEvents.js";
import { NamedEvent } from "../events/NamedEvent.js";
import type { ClientConnection } from "../gateway/Connection.js";
import { GatewayEmitter } from "../gateway/Gateway.js";

function getChannelAndGuild(guildChannel: GuildChannel) {
  return [guildChannel.guild_id.toString(), guildChannel.channel_id.toString()];
}

export function initEvents(client: ClientConnection, guilds: Guild[]) {
  // For now we will subscribe to every event type
  console.log(guilds)
  if (!guilds) {
    console.log("no guild channels");
    return;
  }

  Object.entries(channelListeners).forEach(([event, listener]) => {
    guilds.forEach((guild) => {
      console.log(guild.id)
      guild.channels.forEach((channel: WeakObj) => {
        console.log(event, guild.id, channel.id)
        // Subscribe with channel id and guild id
        GatewayEmitter.channelSubscribe(
          event as KeyOfEvents,
          guild.id,
          channel.id,
          (data) => {
            console.log(data)
            client.send((listener as NamedEventCallback)(data).createJSON());
          },
        );
        
      });
    });
  });

  Object.entries(guildListeners).forEach(([event, listener]) => {
    guilds.forEach((guild) => {
      GatewayEmitter.guildSubscribe(event as KeyOfEvents, guild.id, (data) => {
        client.send((listener as NamedEventCallback)(data).createJSON());
      });
    });
  });
}
