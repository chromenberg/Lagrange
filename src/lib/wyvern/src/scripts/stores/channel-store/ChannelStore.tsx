// To make a channel store we need to store a list of channels
// indexed by their guild id

import { useEffect, useState } from "react";
import EventSystem from "../../core/EventSystem";
import type { ReadyEvent } from "../../types/ReadyType";
import type { Guild } from "../../types/GuildTypes";
import type { Entry } from "../../types/Generics";
import type { Channel } from "../../types/ChannelTypes";

function entriesOfChannels(guilds: Guild[]): Entry<string, Channel[]>[] {
  return guilds.map((guild) => {
    return [guild.id, guild.channels];
  });
}

export default function useChannels() {
  const [channelData, setChannelData] = useState({});

  useEffect(() => {
    // We need to get every channel and organise them by guild ID
    // like {[guild]:{[channels]}}
    EventSystem.once("READY", (data: ReadyEvent) => {
      const channelData = Object.fromEntries(entriesOfChannels(data.guilds));
      console.log("channel data:",channelData,entriesOfChannels(data.guilds))
      setChannelData(channelData)
    });
  }, []);

  return channelData
}
