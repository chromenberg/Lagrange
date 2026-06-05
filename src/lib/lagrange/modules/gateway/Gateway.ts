import { WebSocketServer } from "ws";
import { Config } from "../../Config.js";
import EventEmitter from "node:events";
import type {
  OneOrArr,
  VoidCallback,
  VoidCallbackEventMap,
} from "../../../../common/Typings.js";
import { PubSub } from "../../../core/pubsub/PubSub.js";
import { Collection } from "../../../core/structs/Collection.js";
import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import type WebSocket from "ws";
import { AtlasManager } from "../../../../atlas.index.js";

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
export class Gateway {
  private readonly pubsub: PubSub<any>;
  constructor(pubsub?: PubSub<any>) {
    this.pubsub = pubsub ? pubsub : new PubSub();
    
    // temporary thing, ideally we should not store every guild ever but who cares
    // anything to make it work

    AtlasManager.requests.guilds.getAllGuilds().then((guilds) => {
      guilds?.forEach((guild) => {
        console.log(guild)
      })
    })
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

export class GuildGateway {}

export class ChannelGateway {}

export class ClientConnection {
  private _subs: Collection<symbol, Function> = new Collection();
  private _sock: WebSocket;
  constructor(socket: WebSocket) {
    this._sock = socket;
  }

  public get subs(): Collection<symbol, Function> {
    return this._subs;
  }
  public send(data: Buffer): void {
    this._sock.send(data);
  }
  public on(eventName: string, listener: (...args: any[]) => void): void {
    this.on(eventName, listener);
  }
}
