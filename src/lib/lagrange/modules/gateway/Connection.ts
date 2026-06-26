import type { WebSocket } from "ws";
import { Collection } from "../../../core/structs/Collection.js";
import type { VoidCallback } from "../../../core/types/Types.js";
import { pubSub } from "./PubSubHandler.js";
import { GatewayEmitter } from "../subscriptions/PubSubService.js";

export class ClientConnection {
  private _subs: Collection<symbol, Function> = new Collection();
  private _sock: WebSocket;
  // private _sub = new PubSub()
  constructor(socket: WebSocket) {
    this._sock = socket;
  }
  public get subs(): Collection<symbol, Function> {
    return this._subs;
  }

  public close(code?: number, data?: string | Buffer<ArrayBufferLike>) {
    this._sock.close(code, data);
  }

  // Sends a message back to the client
  public send(data: ArrayBufferLike | string): void {
    this._sock.send(data);
  }
  public on(eventName: string, listener: (...args: any[]) => void): void {
    this._sock.on(eventName, listener);
  }
  public subscribe(eventName: string, listener: VoidCallback) {
    // subscribe to events from the gateway
    // listen to the event publisher?

    pubSub.subscribe(eventName, listener);
  }
}
