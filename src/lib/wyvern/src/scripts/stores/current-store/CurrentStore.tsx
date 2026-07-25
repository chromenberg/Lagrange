const { useEffect, useState } = await import("react");

// import LocationAnnouncer from "../../core/LocationAnnouncer";
// import type { GuildChannel } from "../../types/GuildTypes";
import type { LocationStore } from "../../types/LocationStoreType";
const LocationAnnouncer = (await import("../../core/LocationAnnouncer"))
  .default;
const { ChannelType } = await import("../../types/ChannelTypes");

export function useCurrentRoute(): LocationStore {
  const [location, setLocation] = useState<LocationStore>({
    guild: { id: "INITIALIZE", name: "INITIALIZE" },
    channel: { id: null, name: null, type: ChannelType.GuildText },
  });
  
  useEffect(() => {
    const updateLocation = (data: LocationStore) => {
      console.log(data);
      setLocation(data);
    }
    LocationAnnouncer.once("ROUTE_CHANGE", updateLocation);

    return () => {
      LocationAnnouncer.remove("ROUTE_CHANGE", updateLocation)
    };
  }, [location]);

  return location;
}
