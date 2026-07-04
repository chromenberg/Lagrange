import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import { eventPublisher } from "../../services/EventService.js";
import type { ClientConnection } from "../gateway/Connection.js";
import { GatewayEmitter } from "../gateway/Gateway.js";
import {
  GatewayEvent,
  GatewayEventOpCodes,
  GatewayEventTypes,
} from "./GatewayEvents.js";
// console.log(GatewayEventTypes.MESSAGE_CREATE)
eventPublisher.subscribe("MESSAGE_CREATE", (data) => {
  console.log(data);
});

export function subscribeToMessages(guildChannel: any, sock: ClientConnection) {
  GatewayEmitter.channelSubscribe(
    "MESSAGE_CREATE",
    guildChannel.guild_id?.toString() as string,
    guildChannel.channel_id?.toString() as string,
    (msg: any) => {
      sock.send(
        JSON.stringify({
          opCode: GatewayEventOpCodes.DISPATCH,
          eventName: GatewayEventTypes.MESSAGE_CREATE,
          data: msg,
        }),
      );
    },
  );
}
