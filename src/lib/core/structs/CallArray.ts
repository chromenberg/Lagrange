import type { VoidCallback } from "../types/Types.js";

export class CallArray<V extends VoidCallback = VoidCallback> {
  private _items: V[] = [];
  constructor() {}
  public remove(item: V): void {
    this._items.splice(this._items.findIndex(item), 1);
  }
  public push(item: V): V {
    this._items.push(item);
    console.log("Call array length is now", this.length)
    return item;
  }

  public get length(): number {
    return this._items.length;
  }

  public async callAll(...data: any[]): Promise<void> {
    this._items.forEach((fn) => {
      fn(...data);
    });
  }
}
