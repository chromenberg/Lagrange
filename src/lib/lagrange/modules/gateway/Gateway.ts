import EventEmitter from "events";
import type { Snowflake, VoidCallback, WeakObj } from "../../../core/types/Types.js";
import { nextTick } from "process";
import { CallArray } from "../../../core/structs/CallArray.js";
import { EventSystem } from "./EventHandler.js";
import { WebSocketServer } from "ws";
import { Config } from "../../Config.js";
import { ClientConnection } from "./Connection.js";
import type { WebSocket } from "ws";
import { ClientConnections } from "./Connections.js";
import { GatewayEventHello } from "../event-builders/Hello.js";
import type { GatewayEventTypes } from "../events/GatewayEvents.js";
import type { KeyOfEvents } from "../../../core/types/GatewayTypes.js";
import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import { Registry } from "../../registries/LagrangeRegistry.js";
import { Atlas } from "../../../../_Init.js";

class ModuleLoader {
  constructor() {}

  public load() {}

  public unload() {}
}




export class GatewayEventHandler {
  
}
export class Gateway {
  private _eventPublisher: EventSystem;
  private _gatewayEvents: EventEmitter;
  private _socket: WebSocketServer;

  constructor(eventPublisher?: EventSystem, gatewayEvents?: EventEmitter) {
    this._eventPublisher = eventPublisher ?? new EventSystem()
    this._gatewayEvents = gatewayEvents ?? new EventEmitter()
    this._socket = new WebSocketServer({
      port: Config.Gateway.Socket.Port,
      host: "127.0.0.1",
    });

    this.initConnectionHandler()
    console.log("started gateway")
  }

  // -- Subscribe --

  public guildSubscribe(guildID: Snowflake, listener: VoidCallback) {
    this._eventPublisher._gSub(guildID, listener)
  }

  public channelSubscribe(guildID: Snowflake, channelID: Snowflake, listener: VoidCallback) {
    this._eventPublisher._cSub(guildID, channelID, listener)
  }
  // -- Emitter Methods --
  
  public guildEvent(guildID: Snowflake, eventName: string, data: WeakObj) {
    this._eventPublisher.emitGuild(guildID, eventName, data)
  }

  public channelEvent(guildID: Snowflake, channelID: Snowflake, eventName: string, data: WeakObj) {
    this._eventPublisher.emitChannel(guildID, channelID, eventName, data)
  }
  // -- WebSocket Methods --

  // Sends the hello event to the client as it has connected to the gateway
  private _hello(client: ClientConnection) {
    nextTick(() => {
      client.send(new GatewayEventHello().toJSON());
    });
  }

  // Initializes a new client connection, starts the heartbeat loop and sends the hello event
  private createClientObj(sock: WebSocket) {
    const client = new ClientConnection(sock)

    // Add to heartbeat loop
    const socketID = ClientConnections.add(client, () => {
      client.close();
    });

    // Give client its heartbeat ID
    client.setID(socketID[0]);

    // Send the hello event to the client
    this._hello(client)
  }

  /**
   * Adds a gateway event handler
   * @param name 
   * @param listener 
   */
  public addEvent(name: KeyOfEvents, listener: VoidCallback) {
    this._gatewayEvents.on(name, listener)
  }

  public emitEvent(name: KeyOfEvents, ...data: any[]) {
    this._gatewayEvents.emit(name, ...data)
  }
  
  // Init
  
  public initConnectionHandler() {
    this._socket.on("connection", sock => {
      this.createClientObj(sock)
    })
  }
}

process.on("atlasInit", () => {
  Logger.sendLog(
    LogLevel.Info,
    ["LAGRANGE", "Gateway", "EventManager"],
    "ATLAS init signal found, populating Gateway Publisher",
  );
  Atlas.requests.guilds.getAllGuildChannels().then((res) => {
    res?.forEach((pair) => {
      // convert the guild id into a string as we cant serialize bigints
      const idString = pair.guild_id?.toString();
      const channelID = pair.channel_id?.toString();
      if (!idString || !channelID) return; // check if string is undefined

      Registry.fetch("inverseChannelMap")?.set(channelID, idString);
    });
  })
})
