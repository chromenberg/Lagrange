import { eventPublisher } from "../../services/EventService.js";
import { GatewayEvent, GatewayEventTypes } from "./GatewayEvents.js"
// console.log(GatewayEventTypes.MESSAGE_CREATE)
eventPublisher.subscribe("MESSAGE_CREATE", (data) => {
  console.log(data)
});
