const { useEffect, useState } = await import("react");

import { useLocation } from "react-router";
// import LocationAnnouncer from "../../core/LocationAnnouncer";
// import type { GuildChannel } from "../../types/GuildTypes";
import type { LocationStore } from "../../types/LocationStoreType";
const LocationAnnouncer = (await import("../../core/LocationAnnouncer"))
  .default;
const { ChannelType } = await import("../../types/ChannelTypes");

export function useCurrentRoute(): LocationStore {
  const route = useLocation()
  console.log(route.state)
  const [location, setLocation] = useState<LocationStore>({
    guild: { id: "INITIALIZE", name: "INITIALIZE" },
    channel: { id: null, name: null, type: ChannelType.GuildText },
  });
  
  useEffect(() => {
    console.log("[Routing/Store] Updating routing data")
    const updateLocation = (data: LocationStore) => {
      console.log(data);
      setLocation(data);
    }
    
    LocationAnnouncer.once("ROUTE_CHANGE", updateLocation);

    return () => {
      LocationAnnouncer.remove("ROUTE_CHANGE", updateLocation)
    };
  }, [location]);

  useEffect(() => {
    if (!route.state?.channel) {
      console.log("[Routing/Store] No React-Router state was detected")
    } else {
      console.log("[Routing/Store] Updating channel with React-Router state")
      setLocation({
        guild: location.guild,
        channel: route.state?.channel
      })
    }
  }, [route.state, location.guild])

  return location;
}
