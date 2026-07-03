import { useEffect, useState } from "react";
import LocationAnnouncer from "../../core/LocationAnnouncer";
import type { GuildChannel } from "../../types/GuildTypes";

export function useCurrentRoute() {
  const [currentRoute, setCurrentRoute] = useState({
    channel_id: "",
    guild_id: "",
  });

  useEffect(() => {
    console.log("hcangechannel event effect");
    
    LocationAnnouncer.on("CHANGE_CHANNEL", (e: GuildChannel) => {
      console.log("hcangechannel event");
      console.log("new ids, guild:", e.guild_id, " channel: ", e.channel_id);
      setCurrentRoute({
        channel_id: e.channel_id,
        guild_id: e.guild_id,
      });
    });
  });

  return currentRoute;
}
