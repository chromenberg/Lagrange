/* eslint-disable @typescript-eslint/no-explicit-any */
export class Dispatcher<E = any> {
  private _emitter: EventTarget;
  constructor() {
    this._emitter = new EventTarget();
  }

  public on<K extends keyof E>(
    eventName: K,
    listener: (...args: any[]) => void,
  ): void {
    console.log("new listener created");
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
  public remove(eventName: keyof E, callback: any) {
    if (typeof eventName !== "string")
      throw new Error(
        "Cannot remove a listener when the event name is not a string",
      );
    this._emitter.removeEventListener(eventName as string, callback);
  }

  public onArr(
    eventNames: (keyof E)[],
    callback: ((...args: any[]) => void)[],
  ) {
    if (eventNames.length !== callback.length)
      throw new RangeError(
        `Cannot run onArr when eventNames and callbacks have different lengths, recieved [${eventNames.length}, ${callback.length}]`,
      );

    eventNames.forEach((event, i) => this.on(event, callback[i]));
  }
}
