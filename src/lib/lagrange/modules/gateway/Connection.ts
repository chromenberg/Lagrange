import type { WebSocket } from "ws";
import { Collection } from "../../../core/structs/Collection.js";
import type { VoidCallback } from "../../../core/types/Types.js";
import { pubSub } from "./PubSubHandler.js";
import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import {
  GatewayEventOpCodes,
  type GatewayEvent,
  type GatewayEventPayload,
} from "../events/GatewayEvents.js";
import type { GatewayEventIdentify } from "../events/Identify.js";
import { Atlas } from "../../../../_Init.js";
import { GatewayEventReady } from "../event-builders/Ready.js";
import { ClientConnections } from "./Connections.js";

export class ClientConnection {
  private _subs: Collection<symbol, Function> = new Collection();
  private _sock: WebSocket;
  private _sequence: number;
  private _id: symbol | undefined;
  // private _sub = new PubSub()
  constructor(socket: WebSocket) {
    this._sock = socket;
    this._sequence = 0;

    this.initMessageHandler();
  }
  public get subs(): Collection<symbol, Function> {
    return this._subs;
  }

  // -- Methods for client sequences
  public get sequence(): number {
    return this._sequence;
  }

  /**
   * Increments the sequence count by 1
   * @returns New sequence number
   */
  public incrSeq(): number {
    return this._sequence++;
  }

  /**
   * Decrements the sequence count by 1
   * @returns New sequence number
   */
  public decrSeq(): number {
    return this._sequence--;
  }

  public get id(): symbol {
    if (!this._id) {
      Logger.sendLog(LogLevel.Error, ["LAGRANGE", "Gateway"]);
      throw new ReferenceError();
    }
    return this._id;
  }

  public setID(id: symbol): void {
    this._id = id;
  }

  // Handlers

  private handleIdentify(msg: GatewayEventIdentify) {
    Atlas.requests.users.getUserData(msg.data.token).then((user) => {
      if (!user) {
        // TODO: send identify reject stuff
        return;
      }
      this.handleReady(user);
    });
  }

  private handleReady(user: object) {
    this.send(new GatewayEventReady().setData(user).toJSON());
  }

  private handleHeartbeat() {
    ClientConnections.refresh(this.id);

    // Respond
    this.send(
      JSON.stringify({
        opCode: GatewayEventOpCodes.HEARTBEAT_ACK,
        data: null,
      }),
    );
  }

  // End Handlers

  private handleSentMessage(msg: GatewayEventPayload) {
    switch (msg.opCode) {
      case GatewayEventOpCodes.IDENTIFY:
        this.handleIdentify(msg as GatewayEventIdentify);
        break;
      case GatewayEventOpCodes.HEARTBEAT:
        this.handleHeartbeat();
        break;
    }
  }

  private initMessageHandler() {
    this.on("message", (msg) => {
      // convert the message into an object
      const msgData: GatewayEventPayload = JSON.parse(msg);

      if (msgData.opCode) {
        this.handleSentMessage(msgData);
      }
    });
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
