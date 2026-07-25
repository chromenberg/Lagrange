// import { useEffect } from "react";
import { useCurrentRoute } from "../../../scripts/stores/current-store/CurrentStore";

const useGuildStore = (
  await import("../../../scripts/stores/guild-store/GuildStore")
).default;
const ChannelButton = (await import("../buttons/ChannelButton")).default;

export default function ChannelCreator(/* { guild_id }: { guild_id: string } */) {
  const location = useCurrentRoute()
  const id = location ? location.guild.id : "@jk"
  const channels = useGuildStore().find(
    (guild) => guild.id === (id),
  )?.channels;
  
  return (
    <>
      {channels?.map((channel) => {
        console.log("creating button for", channel.id, location.guild.id)
        return <ChannelButton key={channel.id} channel={channel} guild={location.guild} />;
      })}
    </>
  );
}
