import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import {
  EventMode,
  type KeyOfEvents,
} from "../../../core/types/GatewayTypes.js";
import type { VoidCallback } from "../../../core/types/Types.js";
import type { ClientConnection } from "../gateway/Connection.js";

import {
  GatewayEventOpCodes,
  type GatewayEventPayload,
} from "./GatewayEvents.js";

export class NamedEvent {
  private _eventName: KeyOfEvents;
  private _sequence: number | undefined;
  private _data: any;
  constructor(
    eventName: KeyOfEvents,
    data: any,
    sequence?: number,
  ) {
    this._sequence = sequence;
    this._data = data;
    this._eventName = eventName;
  }

  private _json(fn: VoidCallback): string {
    try {
      if (Object.values(this._data).some(val => typeof val === "bigint")) {
        Logger.sendLog(LogLevel.Error, ["Gateway", "NamedEvent"], "A bigint was present when trying to serialize event data")
      }
      return JSON.stringify(fn.call(this));
    } catch (e) {
      // If the data fails to be converted to a string
      return JSON.stringify({
        message: "Internal server error",
      });
    }
  }

  public create(): GatewayEventPayload {
    return {
      opCode: GatewayEventOpCodes.DISPATCH,
      eventType: this._eventName,
      data: this._data,
    };
  }

  public createSequenced(): GatewayEventPayload {
    return {
      opCode: GatewayEventOpCodes.DISPATCH,
      eventType: this._eventName,
      data: this._data,
      sequenceNumber: this._sequence,
    };
  }

  public createJSON(): string {
    return this._json(this.create);
  }

  public createSeqJSON(): string {
    return this._json(this.createSequenced);
  }
}
