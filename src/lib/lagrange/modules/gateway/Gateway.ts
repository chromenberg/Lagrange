import { WebSocketServer } from "ws";
import { Config } from "../../Config.js";
import EventEmitter from "node:events";
import type {
  OneOrArr,
  VoidCallback,
  VoidCallbackEventMap,
} from "../../../core/types/Types.js";
import { PubSub } from "../../../core/pubsub/PubSub.js";
import { Collection } from "../../../core/structs/Collection.js";
import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import type WebSocket from "ws";
import { Atlas } from "../../../../_Init.js";
import { Cache, type CacheCategories } from "../../../core/cache/Cache.js";
import {
  GatewayEventOpCodes,
  type GatewayEvent,
  type GatewayEventTypes,
} from "../events/GatewayEvents.js";
import { GatewayEventIdentify } from "../../gateway/events/receive/Identify.js";
import { eventPublisher } from "../../services/EventService.js";

//!TODO: Allocate a fuck load of time to this
// because making the gateway stack is actually going to be a lot fucking
// bigger than i thought fuuuuuckkkkkkkkkkk
// i need to manage connections and their permissions
// and send messages based on them and subscribe to events using an entirely
// different database manager fuuuuckkkkkkkkkk
// and i also need to make an entire event scheme and gateway router fuckkkk

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
    Logger.sendLog(
      LogLevel.Verbose,
      ["Gateway (1)", "EventFiltering"],
      "New event received with opcode",
      data.opCode,
      data
    )
    eventPublisher.publish("OPCODE_" + data.opCode, { cli: conn, data: data });
  }

  if (data.eventType) {
    Logger.sendLog(
      LogLevel.Verbose,
      ["Gateway (1)", "EventFiltering"],
      "New event received with name",
      data.eventType,
      data
    );
    eventPublisher.publish(data.eventType, { cli: conn, data: data });    
  }
}

import "../events/Heartbeat.js"
import "../events/MessageCreate.js"
import "../events/Identify.js"
import "../events/Ready.js"
import { GatewayEventHello } from "../../gateway/events/send/Hello.js";

export class Gateway {
  private readonly pubsub: PubSub<any>;
  private readonly socket: WebSocketServer;
  constructor(pubsub?: PubSub<any>) {
    this.pubsub = pubsub ? pubsub : new PubSub();

    // temporary thing, ideally we should not store every guild ever but who cares
    // anything to make it work

    // Atlas.requests.guilds.getAllGuilds().then((guilds) => {
    //   guilds?.forEach((guild) => {
    //     console.log(guild)
    //   })
    // })
    // ---- Message handling
    this.socket = new WebSocketServer({
      port: 82,
      host: "127.0.0.1"
    });
    this.socket.on("connection", (conn) => {
      // Create a client connection that will listen to the events needed
      conn.send(new GatewayEventHello().toJSON())
      new ClientConnection(conn).on("message", (msg) => {
        const data = JSON.parse(msg);

        getEvent(data,conn)
      });
    });
  }

  public subscribe(
    channelID: string,
    listener: VoidCallback,
    ctx?: any,
  ): symbol {
    Logger.sendLog(
      LogLevel.Verbose,
      ["LAGRANGE", "Gateway"],
      "obtained a request to subscribe",
    );
    return this.pubsub.subscribe(channelID, listener, ctx);
  }
  public unsubscribe(channelID: string, listenerID: symbol): boolean {
    Logger.sendLog(
      LogLevel.Verbose,
      ["LAGRANGE", "Gateway"],
      "obtained a request to unsubscribe",
    );
    return this.pubsub.unsubscribe(channelID, listenerID);
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

export class ClientConnection {
  private _subs: Collection<symbol, Function> = new Collection();
  private _sock: WebSocket;
  constructor(socket: WebSocket) {
    this._sock = socket;
  }

  public get subs(): Collection<symbol, Function> {
    return this._subs;
  }
  // Sends a message back to the client
  public send(data: Buffer): void {
    this._sock.send(data);
  }
  public on(eventName: string, listener: (...args: any[]) => void): void {
    this._sock.on(eventName, listener);
  }
}
