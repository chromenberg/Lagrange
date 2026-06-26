import { WebSocketServer } from "ws";
import type { VoidCallback } from "../../../core/types/Types.js";
import { Collection } from "../../../core/structs/Collection.js";
import type WebSocket from "ws";
import {
  type GatewayEvent,
  GatewayEventTypes,
} from "../events/GatewayEvents.js";
import { eventPublisher } from "../../services/EventService.js";
import { ClientConnections } from "./Connections.js";
import "../subscriptions/PubSubService.js"

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
import "../events/Identify.js";
import "../events/Ready.js";
import { GatewayEventHello } from "../../gateway/events/send/Hello.js";
import { pubSub } from "./PubSubHandler.js";
import { Logger } from "../../../core/logging/Logger.js";
import { ClientConnection } from "./Connection.js";

export class Gateway {
  // private readonly pubsub: PubSub<any>;
  private readonly socket: WebSocketServer;
  constructor(/* pubsub?: PubSub<any> */) {
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
  }
}

export class GuildGateway {
  // events involving guilds go from the api to here via the api
}

export class ChannelGateway {
  constructor() {
    // Message Sent
    // Service Resolves
    // Service Creates Event
    // Service Emits to gateway
    // Gateway Publishes event
    //
    // --------------------------------------
    //
    // API Gets Message Create request
    // MessageService Resolves, determines its a MessageCreate
    // Creates a MessageCreate Event and calls the gateway to emit the event
    // Gateway publishes event with the channel ID
    // all connections subscribed get that event and relay it to the client
  }
  // events that have channel related stuff

  // make a message to the gateway to handle this "gateways" event
  // we need to loop over all members who can access this channel
  // and send the event to them

  // we can either get every member in the guild with a database call
  // or we can get every member in the channel
  // (guild would be easier to sort)

  public emitEvent(code: GatewayEventTypes, data: GatewayEvent) {}
}
