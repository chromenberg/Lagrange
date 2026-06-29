import type { WebSocket } from "ws";
import { Collection } from "../../../core/structs/Collection.js";
import type { VoidCallback } from "../../../core/types/Types.js";
import { pubSub } from "./PubSubHandler.js";
import { Logger, LogLevel } from "../../../core/logging/Logger.js";

export class ClientConnection {
  private _subs: Collection<symbol, Function> = new Collection();
  private _sock: WebSocket;
  private _sequence: number;
  private _id: symbol | undefined;
  // private _sub = new PubSub()
  constructor(socket: WebSocket) {
    this._sock = socket;
    this._sequence = 0;
  }
  public get subs(): Collection<symbol, Function> {
    return this._subs;
  }

  // -- Methods for client sequences
  public get sequence(): number {
    return this._sequence
  }
  
  /**
   * Increments the sequence count by 1
   * @returns New sequence number 
   */
  public incrSeq(): number {
    return this._sequence++
  }
  
  /**
   * Decrements the sequence count by 1
   * @returns New sequence number
   */
  public decrSeq(): number {
    return this._sequence--
  }

  public get id(): symbol | undefined {
    if (!this._id) {
      Logger.sendLog(LogLevel.Error, ["LAGRANGE", "Gateway"], )
      throw new ReferenceError()
    }
    return this._id;
  }

  public setID(id: symbol): void {
    this._id = id;
  }

  // -- So
  
  public close(code?: number, data?: string | Buffer<ArrayBufferLike>) {
    // Logger.sendLog(LogLevel.Error, ["Connections"], "Closed Connection")
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
