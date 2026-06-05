import { Collection } from "./Collection.js";

export type CacheOptions = {
  sweepInterval: number;
  sweepCallback: (cleanedData: []) => void;
  sweepSizeThreshold: number;
};

export class Cache<
  K extends string | symbol = symbol,
  V = any,
> extends Collection<K, V> {
  constructor(options?: Partial<CacheOptions>) {
    super();
  }
  // TODO: cache sweeping, read frequency (move to quicker collection)
}
