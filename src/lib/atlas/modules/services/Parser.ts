import { ChannelType } from "../../../core/types/ChannelTypes.js";
import type { WeakObj } from "../../../core/types/Types.js";

export class Parser {
  constructor() {}

  public static parseReadyData(data: object[]) {
    const parsed: WeakObj = {
      guilds: [],
    };
    const guilds: WeakObj = {};
    const channels: WeakObj = {};
    data.forEach((item: WeakObj) => {
      // Push all guild info into an object, keyed by guild id
      guilds[item.guild_id] = {
        id: item.guild_id?.toString(),
        name: item.guild_name,
        owner_id: item.owner_id?.toString(),
        icon: item.icon_hash ?? null,
        banner: item.banner_hash ?? null,
        vanity_url: item.vanity_url ?? null,
      };

      if (!channels[item.guild_id]) {
        channels[item.guild_id] = [];
      }
      // Push all channel info into an array of objects, keyed by guild id
      channels[item.guild_id].push({
        id: item.channel_id.toString(),
        name: item.channel_name,
        index: item.channel_index?.toString(),
        type: item.channel_type?.toString() ?? ChannelType.GuildText,
        flags: item.channel_flags?.toString() ?? 0,
        topic: item.channel_topic ?? null,
      });
    });

    // Set guilds to be the array of guilds that was parsed
    parsed.guilds = Object.values(guilds);

    // Loop through guilds and add every channel with the guild id
    parsed.guilds.forEach((guild: any) => {
      guild.channels = channels[guild.id];
    });

    return parsed;
  }
}
