import { useEffect } from "react";
// import LocationAnnouncer from "../../core/LocationAnnouncer";
// import type { GuildChannel } from "../../types/GuildTypes";
import { useLocation } from "react-router";
import type { LocationStore } from "../../types/LocationStoreType";
import LocationAnnouncer from "../../core/LocationAnnouncer";

export function useCurrentRoute(): LocationStore {
  const location = useLocation()

  useEffect(() => {
    console.log("ROUTE CHANGE | GOING TO "+location.pathname)
    // Emit the location change to the announcer
    LocationAnnouncer.emit("ROUTE_CHANGE", location.state);
  }, [location]);

  return location.state;
}
