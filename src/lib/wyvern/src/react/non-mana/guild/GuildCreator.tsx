

import type { Guild } from "../../../scripts/types/GuildTypes";
const useGuildStore = (await import("../../../scripts/stores/guild-store/GuildStore")).default
const ScrollMenu = (await import("../../mana/scroll-menu/ScrollMenu")).default
const GuildIcon = (await import("./GuildIcon")).default
import("./GuildListScroller.css")

export default function GuildListCreator() {
  const guilds = useGuildStore();
  
  const toIconCompatible = (data: Guild) => {
    return {
      id: data.id,
      name: data.properties.name,
      icon: data.properties.name,
      firstChannel: data.channels[0].id
    };
  };

  const mapGuilds = () => {
    return guilds.map((guild) => {
      return <GuildIcon key={guild.id} guildInfo={toIconCompatible(guild)} />;
    });
  };

  return <ScrollMenu direction="vertical" className="listScroller" gap="med">{mapGuilds()}</ScrollMenu>
}
