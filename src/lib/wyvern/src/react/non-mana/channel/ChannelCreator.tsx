import { useEffect, useState } from "react";
import { getGuildChannels } from "../../../scripts/client/requests/GetGuildChannels";
const useToken = (
  await import("../../../scripts/client/requests/Authorization")
).default;
const ChannelButton = (await import("../buttons/ChannelButton")).default;

type GuildChannels = {
  name: string;
  id: string;
};

export default function ChannelCreator({ guild_id }: { guild_id: string }) {
  const [guildChannels, setGuildChannels] = useState<GuildChannels[]>([]);
  const token = useToken();

  useEffect(() => {
    getGuildChannels(token, guild_id).then((res) => {
      setGuildChannels(res as never[]);
    });
  }, [token, guild_id]);

  return (
    <>
      {guildChannels.map((channel) => {
        return <ChannelButton id={channel.id} name={channel.name} />;
      })}
    </>
  );
}
