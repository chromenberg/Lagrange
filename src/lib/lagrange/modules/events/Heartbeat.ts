import { Logger } from "../../../core/logging/Logger.js";
import { eventPublisher } from "../../services/EventService.js";
import { ClientConnections } from "../gateway/Connections.js";
import { GatewayEventOpCodes } from "./GatewayEvents.js";

eventPublisher.subscribe("OPCODE_" + GatewayEventOpCodes.HEARTBEAT, (data) => {
  // If the client has not sent a heartbeat in a while then we need to
  // disconnect the client from the gateway
  // 
  Logger.sendLog(1, ["Events", "Heartbeat"], "Heartbeat received from", data.data)
  ClientConnections.refresh(data.cli.id)
  
  // Send the heartbeat response
  data.cli.send(JSON.stringify({
    opCode: GatewayEventOpCodes.HEARTBEAT_ACK,
    data: null
  }))
})