import type { Atlas } from "../../AtlasManager.js";
import type { SQLDatabase } from "../sql/SQL.js";
import type { RequestManager } from "../Requests.js";

export class AtlasService {
  protected parent: Atlas;
  constructor(parent: Atlas) {
    this.parent = parent;
  }

  protected get services(): RequestManager {
    return this.parent.requests
  }

  protected get sql(): SQLDatabase {
    return this.parent.sqlClient
  }
}