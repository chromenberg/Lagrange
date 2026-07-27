const { useCurrentRoute } =
  await import("../../../scripts/stores/current-store/CurrentStore");
const ChannelButton = (await import("../buttons/ChannelButton")).default;
const useGuildChannels = (
  await import("../../../scripts/store-funcs/channels/get-guild-channels")
).default;

export default function ChannelCreator() {
  const { guild } = useCurrentRoute();
  // Get the current channels from the selected guild ID
  const channels = useGuildChannels(guild.id);

  return (
    <>
      {channels?.map((channel) => {
        console.log("creating button for", channel.id, guild.id);
        return (
          <ChannelButton
            key={channel.id}
            channel={channel}
            guild={guild}
          />
        );
      })}
    </>
  );
}
