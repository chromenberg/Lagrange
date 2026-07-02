import type { GuildChannel } from "../types/GuildTypes";
const Dispatcher = (await import("./Dispatch")).Dispatcher;

export type RouteChangeEvents = {
  CHANGE_GUILD: string
  CHANGE_CHANNEL: GuildChannel
}

const LocationAnnouncer = new Dispatcher<RouteChangeEvents>();
export default LocationAnnouncer;
