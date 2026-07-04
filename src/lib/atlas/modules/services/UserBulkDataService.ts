import type { Atlas } from "../../AtlasManager.js";
import { AtlasService } from "../client/AtlasChild.js";

export class UserBulkService extends AtlasService {
  constructor(parent: Atlas) {
    super(parent);
  }

  public getReadyData(token: string) {
    
  }
}
