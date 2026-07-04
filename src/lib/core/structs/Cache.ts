import type { Snowflake } from "../types/Types.js";
import { Collection } from "./Collection.js";
type SweepingOptions = {
  interval: number
  maxAge: number
}
// type WithCache<T> = {
//   accessed: Snowflake
//   [keys: keyof T]: 
// }
type CacheFlags = {
  sweeping: SweepingOptions
}
export class Cache<K,V> {
  private data = new Collection<K, V>()
  private sweepSettings: SweepingOptions;
  constructor(flags: CacheFlags) {
    this.sweepSettings = flags.sweeping

    setTimeout(() => {
      this.sweep()
    })
  }

  private sweep() {
    this.data.forEach((item, key) => {
       
    })
  }
}