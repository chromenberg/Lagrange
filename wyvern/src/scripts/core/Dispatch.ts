
/* eslint-disable @typescript-eslint/no-explicit-any */
export class Dispatcher<E> {
  private _emitter: EventTarget;
  constructor() {
    this._emitter = new EventTarget();
  }

  public on<K extends keyof E >(eventName: K, listener: (...args: any[]) => void): void {
    this._emitter.addEventListener(eventName as string, listener);
  }
  public once<K extends keyof E>(eventName: K, listener: (...args: any[]) => void): void {
    this._emitter.addEventListener(eventName as string, listener, { once: true });
  }
  public emit(eventName: keyof E, ...data: any[]): void {
    this._emitter.dispatchEvent(new CustomEvent(eventName as string, ...data));
  }
}

