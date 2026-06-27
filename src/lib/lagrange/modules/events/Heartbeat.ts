import { Logger } from "../../../core/logging/Logger.js";
import { eventPublisher } from "../../services/EventService.js";
import { ClientConnections } from "../gateway/Connections.js";
import { GatewayEventOpCodes } from "./GatewayEvents.js";

// Not joking when i say this but this was working perfectly fine
// until i restarted it, no changes whatsoever
// now trying to make a heartbeat event causes the entire program to crash
// because the heartbeat enum is apparently undefined
// nothing about this was touched and the heartbeat enum is in fact still there
eventPublisher.subscribe("OPCODE_" + GatewayEventOpCodes.HEARTBEAT, (data) => {
  // If the client has not sent a heartbeat in a while then we need to
  // disconnect the client from the gateway
  Logger.sendLog(1, ["Events", "Heartbeat"], "Heartbeat received from", data.data)
  
  // Send the heartbeat response
  data.cli.send(JSON.stringify({
    opCode: GatewayEventOpCodes.HEARTBEAT_ACK,
    data: null
  }))
})