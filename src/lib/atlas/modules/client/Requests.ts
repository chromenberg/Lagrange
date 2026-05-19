import { Atlas } from "../../AtlasManager.js";
class AtlasChild {
  protected parent: Atlas;
  constructor(parent: Atlas) { this.parent = parent; }
}

class UserService extends AtlasChild {
  constructor(parent: Atlas) {
    super(parent);
  }

}
// /users/@me - some service dedicated to the user making it
// /users/:id/profile - getProfile
// 
class MessageService extends AtlasChild {

}

class GuildService extends AtlasChild {

}

class RequestManager {
  constructor(
    private parent: Atlas
  ) { }
}
