import type { WeakObj } from "../types/Types.js";

/**
 * Class that creates an object of arrays, this is useful for arrays that need to be populated 
 * and sorted by an ID
 */
export class MultiArray {
  private _data: WeakObj = {}
  constructor() { }

  public push(key: string, value: any) {
    this._data[key].push(value)
  }

  // public has(key: string, predicate: (filter: [], index: number) => boolean,)
}