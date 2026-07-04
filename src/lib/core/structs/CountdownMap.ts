import type { Snowflake, VoidCallback } from "../types/Types.js";
import { Collection } from "./Collection.js";

type CountdownItem<T> = {
  item: T;
  timer: NodeJS.Timeout;
  callback?: VoidCallback;
};

/**
 * Contains a collection of objects that all have individual timeouts.
 * Useful for automatically running something after inactivity
 */
export class CountdownMap<T> {
  private _data: Collection<symbol, CountdownItem<T>> = new Collection();
  private timeout: number;

  constructor(timeout: number) {
    this.timeout = timeout;
  }

  public add(item: T, callback?: VoidCallback): [symbol, CountdownItem<T>] {
    const key = Symbol("CDItem");
    return this._data.setReturn(key, {
      item,
      callback,
      timer: setTimeout(() => {
        this._data.get(key)?.callback?.(); // pre delete hook
        this.pop(key);
      }, this.timeout),
    });
  }

  public pop(key: symbol): boolean {
    return this._data.delete(key);
  }

  public refresh(key: symbol) {
    this._data.get(key)?.timer.refresh();
  }

  public clear(): void {
    this._data.clear();
  }

  public getItem(key: symbol): T | undefined {
    return this._data.get(key)?.item;
  }

  public get length(): number {
    return this._data.size;
  }
}
