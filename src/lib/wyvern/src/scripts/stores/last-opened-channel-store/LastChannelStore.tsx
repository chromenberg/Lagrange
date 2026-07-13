const { useState } = (await import("react"));
import type LastOpenedStore from "./LastOpenedType";
// const LocationAnnouncer = (await import("../../core/LocationAnnouncer")).default;

export default function useLastOpenedChannel(
  guildID?: string,
  channelID?: string,
) {
  const [openedChannels, setLastOpenedChannel] = useState<LastOpenedStore>({});
  // If GuildID is set and no channel ID is set
  // then return the last opened channel for that guild
  if (guildID! && channelID) {
    return openedChannels[guildID];
  }

  // If both channel and guild id are present
  // then set the channel data and return entire
  // state
  if (guildID && channelID) {
    setLastOpenedChannel({ [guildID]: channelID });
    return openedChannels;
  }

  return openedChannels;
}

// LocationAnnouncer.on("ROUTE_CHANGE", (data) => {
//   if (data === null) {
//     return
//   }
//   console.log(useLastOpenedChannel(data.guild.id, data.channel.id))
// })