import type { GuildChannel } from "../types/GuildTypes";
import type { LocationStore } from "../types/LocationStoreType";
const Dispatcher = (await import("./Dispatch")).Dispatcher;

export type RouteChangeEvents = {
  CHANGE_GUILD: string
  CHANGE_CHANNEL: GuildChannel,
  ROUTE_CHANGE: LocationStore
} 

const LocationAnnouncer = new Dispatcher<RouteChangeEvents>();
export default LocationAnnouncer;

LocationAnnouncer.on("ROUTE_CHANGE", (e)=>{console.log(e)})
