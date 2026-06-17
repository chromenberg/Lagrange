import { GatewayEventReady } from "../../gateway/events/send/Ready.js";
import { eventPublisher } from "../../services/EventService.js";
import { GatewayEventOpCodes, GatewayEventTypes } from "./GatewayEvents.js";

eventPublisher.subscribe(GatewayEventTypes.READY, (data) => {
  
  data.cli.send(new GatewayEventReady().setData(data.user).toJSON());
});
