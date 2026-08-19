import type { WebSocket } from "ws";
import { Collection } from "../../../core/structs/Collection.js";
import type {
  Snowflake,
  VoidCallback,
  WeakObj,
} from "../../../core/types/Types.js";
import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import {
  GatewayEventOpCodes,
  type GatewayEventPayload,
} from "../events/GatewayEvents.js";
import type { GatewayEventIdentify } from "../events/Identify.js";
import { Atlas, Gateway } from "../../../../_Init.js";
import { GatewayEventReady } from "../event-builders/Ready.js";
import { ClientConnections } from "./Connections.js";
import type { Guild } from "../../../core/types/GuildTypes.js";
import { NamedEvent } from "../events/NamedEvent.js";
import { AtlasEvents } from "../../../atlas/AtlasEvents.js";

export class ClientConnection {
  private _subs: Collection<symbol, Function> = new Collection();
  private _sock: WebSocket;
  private _sequence: number;
  private _id: symbol | undefined;
  private _clientID: Snowflake | undefined;
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

  /**
   * Runs the entered callback only if the client ID is present
   * @param callback
   * @param args
   */
  private _runIfClientIDPresent(callback: VoidCallback, ...args: any[]) {
    callback.call(this, ...args);
  }

  // Handlers
  private _filterEvent(...data: any[]) {
    this._runIfClientIDPresent(() => {
      // data[0] is always ownerID
      if (data[0] !== this._clientID) return;

      this._sendEvent(...data);
    });
  }
  private _initEventUpdater() {
    if (!this._clientID) return;
    if (this._clientID.length === 0) return;
    Logger.sendLog(
      LogLevel.Info,
      ["LAGRANGE", "Gateway", "ClientConnection"],
      "Listening to event updater",
    );
    Atlas.on(AtlasEvents.guildCreate, (...data) => {
      this._filterEvent(...data);
    });
    Atlas.on(AtlasEvents.guildRemove, (...data) => {
      this._filterEvent(...data);
    });
    Atlas.on(AtlasEvents.channelCreate, (...data) => {
      this._filterEvent(...data);
    });
    Atlas.on(AtlasEvents.channelRemove, (...data) => {
      this._filterEvent(...data);
    });
  }

  private _initClientListener() {
    if (!this._clientID) return;
    if (this._clientID.length === 0) return;
    Gateway.userSubscribe(this._clientID, (eventName, data) => {
      console.log(eventName, data);
      this._sendEvent(eventName, data);
    });
  }

  private _sendEvent(...data: any[]) {
    const eventName = data[0];
    const eventData = data[1];

    const event = new NamedEvent(eventName, eventData);

    this.send(event.createJSON());
  }

  /**
   * Initializes the client to recieve events from the gateway
   * @param guilds
   */
  private initClientEvents(guilds: Guild[]) {
    const guildsMap = guilds.flatMap((guild) => [
      [guild.id, guild.channels.flatMap((channel) => [channel.id])],
    ]) as [string, string[]][];

    this._initClientListener()
    this._initEventUpdater();

    guildsMap.forEach((guild) => {
      console.log("Subscribing to guild", guild[0]);
      // Subscribe to all events involving guilds
      Gateway.guildSubscribe(guild[0] as string, (...data) => {
        console.log(...data);
        this._sendEvent(...data);
      });

      guild[1].forEach((channel) => {
        console.log("Subscribing to channel", guild[0], channel);
        // subscribe to all events involving channels
        Gateway.channelSubscribe(guild[0], channel, (...data) => {
          console.log(...data);
          console.log("channel event", guild[0], channel, ...data);
          this._sendEvent(...data);
        });
      });
    });
  }

  /**
   * Handles the identify message from the client
   * @param msg
   */
  private handleIdentify(msg: GatewayEventIdentify) {
    // Get the users data from the token sent in the request
    Atlas.requests.users.getUserData(msg.data.token).then((user) => {
      if (!user) {
        // TODO: send identify reject stuff
        return;
      }
      this._clientID = (user as WeakObj)["user_id"];
      this.handleReady(user);
    });
  }

  /**
   * Handles sending the ready event to the client, adding the needed events to connection
   * @param user
   */
  private handleReady(user: WeakObj) {
    this.initClientEvents(user["guilds"]);
    this.send(new GatewayEventReady().setData(user).toJSON());
  }

  /**
   * Handles sending the heartbeat back to the client and refreshes its autodisconnect
   */
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
}
