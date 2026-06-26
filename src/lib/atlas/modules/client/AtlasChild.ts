import type { Atlas } from "../../AtlasManager.js";
import type { RequestManager } from "./Requests.js";

export class AtlasChild {
  protected parent: Atlas;
  constructor(parent: Atlas) {
    this.parent = parent;
  }

  protected get services(): RequestManager {
    return this.parent.requests
  }
}