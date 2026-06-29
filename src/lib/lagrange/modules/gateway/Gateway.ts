import { WebSocketServer } from "ws";
import type { VoidCallback } from "../../../core/types/Types.js";
import { Collection } from "../../../core/structs/Collection.js";
import type WebSocket from "ws";
import {
  type GatewayEvent,
  GatewayEventOpCodes,
  GatewayEventTypes,
} from "../events/GatewayEvents.js";
import { eventPublisher } from "../../services/EventService.js";
import { ClientConnections } from "./Connections.js";
import "./GatewayPublisher.js";

// Timeline
// Client      | Server | Description
// ------------|--------|------------
// Connect     |        | Client connects to gateway
//             | Hello  | Server reply with heartbeat info and ack (show gateway is up)
// Heartbeat   |        | Send first heartbeat event
// Identify    |        | Identify with token and client intents
//             | Ready  | (ident valid) send client info [guilds, friends, dms]
//             | Reauth | (ident invalid) reject client, request reconnect

// Subscribe   |        | Listen to events that occur in a channel?
// *ALT*       |        | Server subscribes using guilds internally instead

function getEvent(data: any, conn: any) {
  if (data.opCode) {
    eventPublisher.publish("OPCODE_" + data.opCode, { cli: conn, data: data });
  }

  if (data.eventType) {
    eventPublisher.publish(data.eventType, { cli: conn, data: data });
  }
}

// TODO: Move this
import "../events/Heartbeat.js";
import "../events/MessageCreate.js";
import "../events/Ready.js";
// import "../events/MessageCreate.js"
import "../events/Identify.js";
import { GatewayEventHello } from "../../gateway/events/send/Hello.js";
import { pubSub } from "./PubSubHandler.js";
import { Logger } from "../../../core/logging/Logger.js";
import { ClientConnection } from "./Connection.js";
import { GatewayPublisher } from "./GatewayPublisher.js";
import { PubSub } from "../../../core/pubsub/PubSub.js";
import type { EventOrOpcode } from "../../../core/types/GatewayTypes.js";

export class Gateway {
  // private readonly pubsub: PubSub<any>;
  private readonly socket: WebSocketServer;
  private readonly _events: PubSub<EventOrOpcode>;
  constructor(/* pubsub?: PubSub<any> */) {
    this._events = new PubSub()
    // this.pubsub = pubsub ? pubsub : new PubSub();
    this.socket = new WebSocketServer({
      port: 82,
      host: "127.0.0.1",
    });

    this.socket.on("connection", (conn) => {
      // Create a client connection that will listen to the events needed
      const socketClient = new ClientConnection(conn);

      ClientConnections.add(socketClient, () => {
        socketClient.close();
      });

      socketClient.send(new GatewayEventHello().toJSON());

      socketClient.on("message", (msg) => {
        const data = JSON.parse(msg);
        getEvent(data, socketClient);
      });
    });
    process.emit("lagrangeInit");
  }

  /*
  Gets the gateways event emitter, this is used for events like identifying
  */
  public get events(): PubSub<EventOrOpcode> {
    return this._events;
  }

  public publish(eventName: keyof EventOrOpcode, data: any, ...args: any[]) {
    this._events.publish(eventName, null, ...args);
  }
}

export const GatewayEmitter = new GatewayPublisher();
