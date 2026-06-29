import EventEmitter from "node:events";
import type { VoidCallback, VoidCallbackEventMap } from "../types/Types.js";
import { Collection } from "../structs/Collection.js";
import { CallArray } from "../structs/CallArray.js";
import { Logger, LogLevel } from "../logging/Logger.js";

type SubMap = {
  eventName: string;
  listener: VoidCallback;
  eventSubgroups?: string[];
  ctx: any;
};

type EventKey = string;

/**
 * Class for managing publishers and subscribers
 */
export abstract class AbstractPubSub<
  EventMap extends Record<EventKey, any>,
> extends EventEmitter {
  protected _subMap: Collection<symbol, SubMap> = new Collection();
  constructor() {
    super();
  }

  /**
   * Internal method for managing subscriptions, intended to be wrapped by an extra method
   */
  protected abstract _subscribe<E extends keyof EventMap & EventKey>(
    eventName: E,
    listener: VoidCallbackEventMap<EventMap>,
  ): symbol;
  /**
   * Internal method for publishing to subscriptions, intended to be wrapped by an extra method
   */
  protected abstract _publish<E extends keyof EventMap & EventKey>(
    eventName: E,
    ...args: any[]
  ): void;
  /**
   * Internal method for unsubscribing, intended to be wrapped by an extra method
   */
  protected abstract _unsubscribe<E extends keyof EventMap & EventKey>(
    eventName: E,
    listenerID: symbol,
  ): void;
}

// a client subscribes to an event which will be the channel ID
// the PubSub should maybe validate if that client is able to access said channel
export class PubSub<
  EventMap extends Record<EventKey, any>,
> extends AbstractPubSub<EventMap> {
  private _registeredEvents: Collection<string, CallArray> = new Collection();

  constructor() {
    super();
  }

  protected _subscribe<E extends keyof EventMap & EventKey>(
    eventName: E,
    listener: any,
    ctx?: any,
  ): symbol {
    // if event is not already registered then
    if (!this._registeredEvents.has(eventName)) {
      // create a new event in the registry with a CallArray
      // then add the listener into the call array
      Logger.sendLog(LogLevel.Verbose, ["PubSub"], "New subscription for the event ["+eventName+"]. First time event was made")
      this._registeredEvents.set(eventName, new CallArray())
      this._registeredEvents.get(eventName)?.push(listener);
      
      this.on(eventName, (...args: any[]) => {
        this._registeredEvents.get(eventName)?.callAll(...args);
      });
    } else {
      // if event already exists then just add the listener into the call array
      Logger.sendLog(LogLevel.Verbose, ["PubSub"], "New subscription for the event ["+eventName+"]")
      this._registeredEvents.get(eventName)?.push(listener);
      
    }
    
    // TODO: too many subscriptions can slow down process with this method
    // unify event emitters to activate on the same emitter if already present
    // this.on(eventName, (...args: any[]) => {
    //   listener.call(ctx, ...args);
    // });
    return this._subMap.setReturn(Symbol(eventName), {
      listener,
      eventName,
      ctx,
    })[0];
  }

  protected _publish<E extends keyof EventMap & EventKey>(
    eventName: E,
    data: EventMap[E],
    ...args: any[]
  ): void {
    this.emit(eventName, data, ...args);
  }

  protected _unsubscribe<E extends keyof EventMap & EventKey>(
    eventName: E,
    listenerID: symbol,
  ): boolean {
    const sub = this._subMap.get(listenerID);
    if (!sub) return false;
    this.removeListener(eventName, sub.listener);
    return true;
  }

  public subscribe<E extends keyof EventMap & EventKey>(
    eventName: E,
    listener: VoidCallbackEventMap<EventMap>,
    ctx?: any,
  ): symbol {
    return this._subscribe(eventName, listener, ctx);
  }

  public wildcardSubscribe<E extends keyof EventMap & EventKey>(
    listener: VoidCallbackEventMap<EventMap>,
    ctx?: any,
  ): symbol[] {
    return this._registeredEvents.keysArr().map(event => {
      return this.subscribe(event, listener, ctx)
    })
  }
  
  public unsubscribe<E extends keyof EventMap & EventKey>(
    eventName: E,
    listenerID: symbol,
  ): boolean {
    return this._unsubscribe(eventName, listenerID);
  }
  public publish<E extends keyof EventMap & EventKey>(
    eventName: E,
    // TODO: Fix this again
    data: any,
    ...args: any[]
  ) {
    this._publish(eventName, data, ...args);
  }
}

// class GuardedPubSub<E> extends PubSub<E> {
//   constructor() {
//     super();
//   }

//   public override subscribe(eventName: string, listener: VoidCallback): symbol {
//     this.on(eventName, listener);
//     return this._subMap.setReturn(Symbol(eventName), {
//       listener,
//       eventName,
//     })[0];
//   }

//   public override publish(eventName: string, ...args: any[]): void {
//     this.emit(eventName, ...args);
//   }

//   public override unsubscribe(eventName: string, listenerID: symbol): void {
//     const sub = this._subMap.get(listenerID);
//     if (!sub) return;
//     this.removeListener(eventName, sub.listener);
//   }
// }
