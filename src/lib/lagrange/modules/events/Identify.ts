import { Atlas } from "../../../../_Init.js";
import { Logger } from "../../../core/logging/Logger.js";
import { eventPublisher } from "../../services/EventService.js";
import { GatewayEventOpCodes, GatewayEventTypes } from "./GatewayEvents.js";

eventPublisher.subscribe("OPCODE_" + GatewayEventOpCodes.IDENTIFY, (data) => {
  Logger.sendLog(2, ["Events", "Identify"], "Identify received from", data.data)
  // TODO: What the fuck is this shit --------\ - Fix this godawful name convention
  Atlas.requests.users.getFullUserByToken(data.data.data.token).then(user => {
    if (Object.hasOwn(user, "message")) {
      // TODO: Cant we publish events like this directly to the ClientConnection instance?
      eventPublisher.publish("OPCODE_"+GatewayEventOpCodes.INVALID_SESSION, {cli: data.cli,  data:user })
    }

    eventPublisher.publish(GatewayEventTypes.READY, {cli: data.cli,  user:user })
  })
})