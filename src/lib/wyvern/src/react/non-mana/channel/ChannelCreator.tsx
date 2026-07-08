// import { useEffect } from "react";
import { useCurrentRoute } from "../../../scripts/stores/current-store/CurrentStore";

const useGuildStore = (
  await import("../../../scripts/stores/guild-store/GuildStore")
).default;
const ChannelButton = (await import("../buttons/ChannelButton")).default;

export default function ChannelCreator(/* { guild_id }: { guild_id: string } */) {
  const location = useCurrentRoute()
  const id = location ? location.guild.id : "@me"
  const channels = useGuildStore().find(
    (guild) => guild.id === (id),
  )?.channels;
  
  return (
    <>
      {channels?.map((channel) => {
        return <ChannelButton key={channel.id} id={channel.id} name={channel.name} />;
      })}
    </>
  );
}
