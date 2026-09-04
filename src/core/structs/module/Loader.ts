import { Collection } from "../Collection.js";
import type { BaseModule } from "./Module.js";


export class ModuleLoader  {
  private _modules: Collection<symbol, BaseModule> = new Collection()
  constructor() {
    
  }

  public add(module: BaseModule) {
    this._modules.set(Symbol("Module"), module)
  }
}