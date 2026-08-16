import { Logger } from "../logging/Logger.js";
import type { VoidCallback } from "../types/Types.js";


/**
 * Stores an array of functions that can be called all in one time
 */
export class CallArray<V extends VoidCallback = VoidCallback> {
  private _items: V[] = [];
  constructor() {}
  public remove(item: V): void {
    this._items.splice(this._items.findIndex(item), 1);
  }
  public push(item: V): V {
    this._items.push(item);
    return item;
  }

  public get length(): number {
    return this._items.length;
  }

  public callAll(...data: any[]): void {
    this._items.forEach((fn) => {
      fn(...data);
    });
  }

  public clear(): void {
    this._items = []
  }
}
