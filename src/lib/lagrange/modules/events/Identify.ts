import { eventPublisher } from "../../services/EventService.js";
import { GatewayEventOpCodes } from "./GatewayEvents.js";

eventPublisher.subscribe("OPCODE_" + GatewayEventOpCodes.IDENTIFY, (data) => {
  console.log(data)
})