/* eslint-disable @typescript-eslint/no-explicit-any */
export class Dispatcher<E> {
  private _emitter: EventTarget;
  constructor() {
    this._emitter = new EventTarget();
  }

  public on<K extends keyof E>(
    eventName: K,
    listener: (...args: any[]) => void,
  ): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this._emitter.addEventListener(eventName as string, (e: CustomEvent) => {
      listener(...e.detail);
    });
  }
  public once<K extends keyof E>(
    eventName: K,
    listener: (...args: any[]) => void,
  ): void {
    this._emitter.addEventListener(
      eventName as string,

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (e: CustomEvent) => {
        listener(...e.detail);
      },
      { once: true },
    );
  }
  public emit(eventName: keyof E, ...data: any[]): void {
    this._emitter.dispatchEvent(
      new CustomEvent(eventName as string, { detail: data }),
    );
  }
}
