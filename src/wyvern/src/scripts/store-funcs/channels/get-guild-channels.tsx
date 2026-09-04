const useChannels = (await import("../../stores/channel-store/ChannelStore")).default

export default function useGuildChannels(guildID: string) {
  const channels = useChannels()
  return channels[guildID]
}