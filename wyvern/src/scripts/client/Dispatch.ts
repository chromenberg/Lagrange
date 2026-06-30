/* eslint-disable @typescript-eslint/no-explicit-any */
export class Dispatcher<E extends (keyof E extends string ? string : string)> {
  private _emitter: EventTarget;
  constructor() {
    this._emitter = new EventTarget();
  }

  public on(eventName: E, listener: (...args: any[]) => void): void {
    this._emitter.addEventListener(eventName, listener);
  }
  public emit(eventName: E, ...data: any[]): void {
    this._emitter.dispatchEvent(new CustomEvent(eventName, ...data));
  }
}
const EventSystem = new Dispatcher()
export default EventSystem;