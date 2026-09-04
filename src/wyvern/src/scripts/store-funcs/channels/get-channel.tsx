const useChannels = (await import("../../stores/channel-store/ChannelStore")).default
import type { Channel } from "../../types/ChannelTypes";

// Terribly named
export default function useSpecificChannel(channelID: string): Channel | undefined {
  const channels = useChannels();
  return Object.values(channels)
    .flat()
    .find((channel) => channel.id === channelID);
}
