import type { Snowflake } from "../types/Types.js";
import { Collection } from "../structs/Collection.js";
// type CacheType<K extends string, V> = {
//
// }

type CacheGuild = {
  lastAccessed: string;
  members: Snowflake[];
};
type CacheUser = {
  lastAccessed: string;
  // TODO: Add more detail to this
  userData: Record<string, any>;
};

// ? An IQ too high? | Fix this if it gives problems
type PropKey<T> = T extends keyof string ? keyof T : string;
type String<T> = T extends string ? string : string;

export type CacheCategories = {
  guilds: Record<Snowflake, CacheGuild>;
  users: Record<Snowflake, CacheUser>;
};

export class Cache<T extends CacheCategories = CacheCategories> {
  public readonly guilds = new Collection<string, T["guilds"]>();
  public readonly users = new Collection<string, T["users"]>();
  constructor() {}

  /**
   * Pushes a new item into the cache
   * @param dest the cache section to insert into
   * @param id the id of the new cache item
   * @param data an object containing the data of the item
   */
  public push<K extends keyof T, KV extends keyof T[K]>(
    dest: K,
    id: KV,
    data: T[K][KV],
  ): this {
    // @ts-ignore - this is already locked
    this[dest].setReturn(id, data);
    return this
  }
  public sweep() {}
}
