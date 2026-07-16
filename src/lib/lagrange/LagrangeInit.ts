// import { API } from "./modules/rest/REST.js";
// import { Gateway } from "./gateway/Gateway.js";
// import { Atlas } from "../atlas/AtlasManager.js";

// export const gateway = new Gateway();
// export const atlas = new Atlas();
// export const api = API;

// export function init():void {}
import { PubSub } from "../core/pubsub/PubSub.js";
import { Router } from "./modules/rest/Router.js";
import { Atlas } from "../atlas/AtlasManager.js";
import { SiteService } from "./services/SiteService.js";
import { MessageService } from "./services/MessageService.js";
import { GuildService } from "./services/GuildService.js";
import { AuthService } from "./services/AuthService.js";
import { UserService } from "./services/UserService.js";
import { GatewayPublisher } from "./modules/gateway/GatewayPublisher.js";
import { Gateway } from "./modules/gateway/Gateway.js";
import { InviteService } from "./services/InviteService.js";
import { CDNService } from "./services/CDNService.js";

export const __atlas = new Atlas();

export const __pubsub = new PubSub();
export const __api = new Router();
export let __gatewayEmitter: GatewayPublisher;
// TODO: This is a weird way of doing it
process.on("atlasInit", () => {
  console.log("ggdfgd")
  __gatewayEmitter = new GatewayPublisher();
  console.log()
});
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
__api.route("/api/v1/guilds/", (route) => new GuildService(route));
__api.route("/invite/", (route) => new InviteService(route));
__api.route("/attachments/", (route) => new CDNService(route));