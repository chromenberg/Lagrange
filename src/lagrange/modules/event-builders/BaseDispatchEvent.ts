import type { KeyOfEvents } from "../../../core/types/GatewayTypes.js";

export class BaseDispatchEvent {
  protected readonly _opCode = 0;
  protected _data: any;
  protected _eventType: KeyOfEvents

  constructor(eventType: KeyOfEvents, data: any) {
    this._data = data
    this._eventType = eventType
  }

  public toJSON() {
    return {
      opCode: this._opCode,
      data: this._data,
      eventType: this._eventType
    }
  }
  
  public stringify(): string {
    return JSON.stringify(this.toJSON())
  }
}