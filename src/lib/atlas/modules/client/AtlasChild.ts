import type { Atlas } from "../../AtlasManager.js";

export class AtlasChild {
  protected parent: Atlas;
  constructor(parent: Atlas) {
    this.parent = parent;
  }
}