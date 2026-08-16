import { Atlas } from "../../../../_Init.js";
import { Logger } from "../../../core/logging/Logger.js";
import { eventPublisher } from "../../services/EventService.js";
import { GatewayEventOpCodes, GatewayEventTypes, type GatewayEventPayload } from "./GatewayEvents.js";

export interface GatewayEventIdentify extends GatewayEventPayload {
  opCode: GatewayEventOpCodes.IDENTIFY
  data: {
    token: string
  }
}

eventPublisher.subscribe("OPCODE_" + GatewayEventOpCodes.IDENTIFY, (data) => {
  Logger.sendLog(2, ["Events", "Identify"], "Identify received from", data.data)
  // TODO: What the fuck is this shit --------\ - Fix this godawful name convention
  // .then(user => {
    if (!user) return
    if (Object.hasOwn(user, "message")) {
      // TODO: Cant we publish events like this directly to the ClientConnection instance?
      eventPublisher.publish("OPCODE_"+GatewayEventOpCodes.INVALID_SESSION, {cli: data.cli,  data:user })
    }
    // console.log(user)
    eventPublisher.publish(GatewayEventTypes.READY, {cli: data.cli,  user:user })
  // })
})