import { Logger, LogLevel } from "../../core/logging/Logger.js";
import { Collection } from "../../core/structs/Collection.js";

export class LagRegistry {
  private _data: Collection<string, Collection<string, any>>
  constructor() {
    Logger.sendLog(LogLevel.Info, ["LAGRANGE", "Registry"], "Initializing Registry")
    this._data = new Collection()
  }

  public fetch(key: string) {
    return this._data.get(key)
  }
  public put(key: string, value: Collection<string, any>) {
    this._data.set(key, value)
  }
}

export const Registry = new LagRegistry()
Registry.put("inverseChannelMap", new Collection<string, string>());
