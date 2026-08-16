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

class ModuleLoader {
  constructor() {}

  public load() {}

  public unload() {}
}




export class GatewayEventHandler {
  
}
export class Gateway {
  private _emitter: EventSystem
  private _socket: WebSocketServer;

  constructor() {
    this._emitter = new EventSystem()
    this._socket = new WebSocketServer({
      port: Config.Gateway.Socket.Port,
      host: "127.0.0.1",
    });

    this.initConnectionHandler()
    console.log("started gateway")
  }

  // -- Emitter Methods --
  
  public guildEvent(guildID: Snowflake, data: WeakObj) {
    this._emitter.emitGuild(guildID, data)
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
  
  public initConnectionHandler() {
    this._socket.on("connection", sock => {
      this.createClientObj(sock)
    })
  }
}
