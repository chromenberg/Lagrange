import { useEffect, useState } from "react";
// import LocationAnnouncer from "../../core/LocationAnnouncer";
// import type { GuildChannel } from "../../types/GuildTypes";
import type { LocationStore } from "../../types/LocationStoreType";
import LocationAnnouncer from "../../core/LocationAnnouncer";
import { ChannelType } from "../../types/ChannelTypes";

export function useCurrentRoute(): LocationStore {
  const [location, setLocation] = useState<LocationStore>({
    guild: { id: "@me", name: "@me" },
    channel: { id: null, name: null, type: ChannelType.GuildText },
  });

  useEffect(() => {
    // console.log("ROUTE CHANGE | GOING TO "+location.pathname)
    // Emit the location change to the announcer
    LocationAnnouncer.on("ROUTE_CHANGE", (data) => {
      console.log("[Routes] Going to", "/channels/"+data.guild.id+"/"+data.channel.id)
      setLocation(data);
    });
  }, [location]);

  return location;
}
