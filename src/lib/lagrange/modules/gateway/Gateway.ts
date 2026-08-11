import { WebSocketServer } from "ws";
import { eventPublisher } from "../../services/EventService.js";
import { ClientConnections } from "./Connections.js";
import "./GatewayPublisher.js";
import { GatewayEventHello } from "../../gateway/events/send/Hello.js";
import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import { ClientConnection } from "./Connection.js";
import { GatewayPublisher } from "./GatewayPublisher.js";
import { PubSub } from "../../../core/pubsub/PubSub.js";
import type { EventOrOpcode } from "../../../core/types/GatewayTypes.js";
import { nextTick } from "node:process";
import "../events/EventAggregate.js"
import { Config } from "../../Config.js";
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

// FIXME: gateway now sends a fixed number of servers regardless of account (which is not a good thing!)

export class Gateway {
  // private readonly pubsub: PubSub<any>;
  private readonly socket: WebSocketServer;
  private readonly _events: PubSub<EventOrOpcode>;
  constructor(/* pubsub?: PubSub<any> */) {
    this._events = new PubSub();
    // this.pubsub = pubsub ? pubsub : new PubSub();
    this.socket = new WebSocketServer({
      port: Config.Gateway.Socket.Port,
      host: "127.0.0.1",
    });

    // TODO: Make this more simplified, add a method that is responsible for handling initializing connections
    this.socket.on("connection", (conn) => {
      // Create a client connection that will listen to the events needed
      const socketClient = new ClientConnection(conn);

      socketClient.on("message", (msg) => {
        const data = JSON.parse(msg);
        getEvent(data, socketClient);
      });

      // Connection ID for the socket
      const socketID = ClientConnections.add(socketClient, () => {
        socketClient.close();
      });
      socketClient.setID(socketID[0]);

      // Ensure the hello event is sent only when everything is done
      // to prevent the heartbeat refreshing the connection when no ID was set
      nextTick(() => {
        socketClient.send(new GatewayEventHello().toJSON());
      });
    });
    process.emit("lagrangeInit");
    Logger.sendLog(LogLevel.Success, ["LAGRANGE", "Gateway"], "Successfully Initialized")
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
