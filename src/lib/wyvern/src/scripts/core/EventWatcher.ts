import type { AnyCallback } from "../types/Callbacks";
import type { Dispatcher } from "./Dispatch";

/**
 * Contains an array of classes that can be cleaned up without needing to 
 * track every listener used
 */
export class EventWatcher<T> {
  private events: Set<T> = new Set();
  private eventName: string;
  private listener: Dispatcher;
  constructor(listener: Dispatcher, eventName: string) {
    this.eventName = eventName;
    this.listener = listener
  }

  /**
   * Removes every single registered event from the system
   */
  public cleanup() {
    this.events.forEach(event => {
      this.listener.remove(this.eventName, event)
    })
    this.events.clear()
  }

  /**
   * Registers an event into the event watcher
   * @param listener 
   */
  public register(listener: T) {
    console.log("New listener registered, length is now", this.events.size)
    this.listener.on(this.eventName, listener as AnyCallback)
    this.events.add(listener)
  }

  /**
   * Registers an array of listeners into the watcher system
   * @param listeners 
   */
  public registerBatch(listeners: T[]) {
    listeners.forEach(callback => {
      this.listener.on(this.eventName, callback as AnyCallback)
      this.events.add(callback)
    })
  }
}
