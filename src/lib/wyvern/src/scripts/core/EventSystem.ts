import type { EventTypes } from "../client/events/Event";
const Dispatcher = (await import("./Dispatch")).Dispatcher;

const EventSystem = new Dispatcher<EventTypes>();
export default EventSystem;
