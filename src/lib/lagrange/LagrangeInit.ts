// import { API } from "./modules/rest/REST.js";
// import { Gateway } from "./gateway/Gateway.js";
// import { Atlas } from "../atlas/AtlasManager.js";

// export const gateway = new Gateway();
// export const atlas = new Atlas();
// export const api = API;

// export function init():void {}
import { Gateway } from "./gateway/Gateway.js";
import { PubSub } from "../core/pubsub/PubSub.js";
import { Router } from "./modules/rest/Router.js";
import { Atlas } from "../atlas/AtlasManager.js";
import { SiteService } from "./services/SiteService.js";
import { MessageService } from "./services/MessageService.js";
import { AuthService } from "./services/AuthService.js";
import { UserService } from "./services/UserService.js";


export const __atlas = new Atlas();
export const __pubsub = new PubSub();
export const __api = new Router();
export function initGateway() {
  return new Gateway();
}

// FIXME: All routes get checked, not good, should add filtering for duplicate routes
__api.alias("/channels/@me", "/api/content/index.html");
__api.route(
  "/api/content/",
  (route) => new SiteService(route, "./dist/lib/wyvern/"),
);
__api.route(
  "/api/v1/channels/",
  // TODO: rename to ChannelService
  (route) => new MessageService(route),
);
__api.route("/api/v1/users/", (route) => new UserService(route));
__api.route("/api/v1/auth/", (route) => new AuthService(route));

