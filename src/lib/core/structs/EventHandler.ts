import EventEmitter from "events";
import type { VoidCallback } from "../types/Types.js";
import { nextTick } from "process";
import { CallArray } from "./CallArray.js";

export class EventHandler {
  private emitter: EventEmitter;

  private listeners: {
    join: CallArray;
    leave: CallArray;
    init: CallArray;
  } = {
    join: new CallArray(),
    leave: new CallArray(),
    init: new CallArray(),
  };
  constructor(emitter?: EventEmitter) {
    this.emitter = emitter ?? new EventEmitter();
    // wait until call stack has been drained
    // before running the init callbacks, this ensures that all the needed
    // functions have been added before going
    nextTick(() => {
      this.listeners.init.callAll();
      this.listeners.init.clear();
    });
  }

  /**
   * Runs once when the EventHandler is made.
   * @param callback
   */
  public onInit(callback: VoidCallback) {
    this.listeners.init.push(callback);
  }

  public onJoin(callback: VoidCallback) {
    this.listeners.join.push(callback);
  }

  public onLeave(callback: VoidCallback) {
    this.listeners.leave.push(callback);
  }

  private callJoin() {
    this.listeners.join.callAll();
  }
  private callLeave() {
    this.listeners.leave.callAll();
  }

  public on(event: string, listener: VoidCallback) {
    this.emitter.on(event, listener);
    this.callJoin();
  }
  public once(event: string, listener: VoidCallback) {
    this.emitter.once(event, listener);
    this.callJoin();
  }
  public prepend(event: string, listener: VoidCallback) {
    this.emitter.prependListener(event, listener);
    this.callJoin();
  }
  public prependOnce(event: string, listener: VoidCallback) {
    this.emitter.prependOnceListener(event, listener);
    this.callJoin();
  }

  public off(event: string, listener: VoidCallback) {
    this.emitter.off(event, listener);
    this.callLeave();
  }

  public emit(event: string, ...data: any[]) {
    this.emitter.emit(event, ...data)
  }
}