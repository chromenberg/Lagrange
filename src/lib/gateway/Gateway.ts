import {WebSocketServer, WebSocket, type RawData} from "ws";
import { Config } from "../Config.js";
import { GatewayEvent, GatewayEventOpCodes, GatewayEventTypes, type GatewayEventPayload } from "./events/GatewayEvents.js";
import { GatewayEventReady } from "./events/send/Ready.js";
import { GatewayEventHello } from "./events/send/Hello.js";
import { LogLevels, SerLogger } from "../Logging.js";
import { TypedReadWriteBuffer } from "../Buffer.js";
import { GatewayEventIdentify } from "./events/receive/Identify.js";
import { Readable } from "node:stream";

type SocketMapConnection = Map<Symbol, WebSocket>;
// function newClassIfUndefined<Class extends Object>(inputToCheck: Class, ): Class {
//     return inputToCheck ? inputToCheck : new Class()
// }
export namespace Lagrange { //Todo: Sort this stuff out
    export namespace Socket {
        export namespace Handling {
        
        }
    }   
}

class GatewaySocketRequest extends GatewayEvent { // made when the client sends something to the gateway
    constructor(
        private _event: GatewayEventPayload, // data of the event
        private _socketKey: Symbol
    ) {
        super(_event);
    }

    public get socketKey(): Symbol {
        return this._socketKey;
    }
    public get event(): GatewayEventPayload {
        return this._event;
    }
    public get all(): [Symbol, GatewayEventPayload] {
        return [this._socketKey, this._event]
    }
    
}

class GatewaySocketMessageHandler {
    private readonly buffer: TypedReadWriteBuffer = new TypedReadWriteBuffer();
    constructor(private readonly parentSocket: GatewaySocket) { // sockets write their received requests into here, and then this will drain the buffer of requests until empty
        const uid = crypto.randomUUID();
        SerLogger.log(LogLevels.Info, "[GatewaySocket] Initialised a GatewaySocketMessageHandler [",uid,"]");
        this.buffer.on("readable", ()=>{this.handle()});
    }

    writeRequest(dataIn: GatewaySocketRequest) {
        this.buffer.write<GatewaySocketRequest>(dataIn);
    }
    read(): GatewaySocketRequest {
        return this.buffer.read()
    };
    handle() {
    
        let chunk: GatewaySocketRequest;
        while (null !== (chunk = this.buffer.read())) {
            this.parentSocket.handleMessage(chunk); // call through the injected parent to request message handling
        }
    }
}

// registry to manage active connections, contains a map as only one unique connection should be valid at a time, duplicate data will be overriden
// contains functions for adding, removing, and finding a key by value and finding a value by a key
class GatewaySocketConnections {
    private _connections: SocketMapConnection = new Map<Symbol, WebSocket>();

    public get connections(): SocketMapConnection {
        return this._connections;
    }
    public get size(): number {
        return this.size;
    }
    public add(socket: WebSocket): Symbol {
        const socketMapKey: Symbol = Symbol("GatewaySocketConnection");
        this._connections.set(socketMapKey, socket);
        return socketMapKey;
    }

    public remove(key: Symbol): Boolean {
        return this._connections.delete(key);
    }

    public has(key: Symbol): Boolean {
        return this._connections.has(key);
    }

    public hasValue(socket: WebSocket): Boolean {
        return this._connections.values().find(value => value===socket)? true : false;
    }

    public findValue(key: Symbol): WebSocket | undefined {
        return this._connections.get(key);
    }

    public findKey(value: WebSocket): Symbol | undefined {
        let res: Symbol | undefined = undefined;
        this._connections.entries().find(([key, val]) => (val===value) ? res=key : undefined); // loop through all key value pairs, if a value is equal to the passed in value, set res to the key belonging to that value. else do nothing
        return res;
    }
}
class GatewaySocket extends WebSocketServer {
    private uid: String; // this will be the actual root of a socket, all its functions are made here, and then added in via gateway
    private connectionMap: GatewaySocketConnections;
    private socketMessageBuffer: GatewaySocketMessageHandler;

    constructor(
        connectionMap?: GatewaySocketConnections,
        socketBuffer?: GatewaySocketMessageHandler
    ) {
        super({
            host:Config.Gateway.Socket.Address,
            port:Config.Gateway.Socket.Port
        });
        this.uid = crypto.randomUUID();
        SerLogger.log(LogLevels.Info, "[GatewaySocket] Gateway Socket (",this.uid,") Initialised");

        this.socketMessageBuffer = socketBuffer ? socketBuffer : ((): GatewaySocketMessageHandler => {
            SerLogger.log(LogLevels.Warning, "[GatewaySocket] A message buffer was not passed into GatewaySocket[",this.uid,"]") ;
            return new GatewaySocketMessageHandler(this);
        })();
        this.connectionMap = connectionMap ? connectionMap : new GatewaySocketConnections();// if not passed in then create its own connectionmap
        this.on("connection", this.onConnect)
    }
    
    private sendPayload(connection: WebSocket, payload: GatewayEvent) {
        connection.send(payload.toJSON());
    }

    private onConnect(connection: WebSocket) {
        const connectionKey: Symbol = this.connectionMap?.add(connection);

        SerLogger.log(LogLevels.Info, "[GatewaySocket] New connection to gateway as [",connectionKey,"]");
        this.sendPayload(connection, new GatewayEventHello());

        connection.on("message", (data: RawData) => {
            this.onMessage(connectionKey, data);
        });
    }
    private onLeave(connection: WebSocket) {
        
    }
    private onMessage(key: Symbol ,data: RawData) {
        const msg = JSON.parse(data.toString());
        this.socketMessageBuffer.writeRequest(new GatewaySocketRequest(// temporary thing for the time being
            msg, // we create a new gateway socket request with data and key and then instantly add it into the buffer
            key            
        ))
    }

    public handleMessage(req: GatewaySocketRequest) {
        //console.log(req.all)
        const key = req.socketKey;
        const event = req.event;
        
        function sendResponse(this: GatewaySocket, data: GatewayEvent) {
            this.connectionMap.findValue(key)?.send(data.toJSON());
        }

        switch (event.opCode) {
            case GatewayEventOpCodes.IDENTIFY: {
                // on udentify
                // > check cache for token, then database if cache isnt active
                // > check client intents
                // > > if there is a match, ack, client gets to login
                // > > if there isnt, then reject and make the client retry the identification 

                SerLogger.log(LogLevels.Info, "[GatewaySocket] Client is requesting to identify...");
                SerLogger.log(LogLevels.Info, "[GatewaySocket] Client request:\n",event.data);

                sendResponse.call(this, new GatewayEventReady);
                break;
            }
        }
    }
}

class GatewayShardingManager {
    private shards: Set<GatewaySocket> = new Set([]);
    constructor() {
        
    }

    public newShard(socket: GatewaySocket) {
        this.shards.add(socket);
    }


}

export class Gateway { // gateway will handle every socket, max socket limits adn the likes
                // gateway will also handle filtering, so that messages dont get sent to everyone
                // gateway also will handle socket to socket communication,
                // incase there are messages for a user that happens to lie on another shard
    private readonly maxShards: number = Config.Gateway.Sharding.MaxSockets;
    public readonly socket: GatewaySocket;
    constructor() {
        this.socket = new GatewaySocket();
        SerLogger.log(LogLevels.Info, "[Gateway] Gateway Initialised");
    }
}


class GatewayMessage { // defines a shard message

}
class GatewaySocketMessenger { // shard to shard communication

}
class GatewayFiltering { // filter requests to know what to do with them and who to send them to

}
class GatewayReceiver { // self explanatory

}
class GatewayTransmitter { // self explanatory

}
