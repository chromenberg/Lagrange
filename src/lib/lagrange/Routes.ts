import { MessageService } from "./services/MessageService.js";
import { UserService } from "./services/UserService.js";
import { AuthService } from "./services/AuthService.js";
import { SiteService } from "./services/SiteService.js";
import { API } from "../../Init.js";

// FIXME: All routes get checked, not good, should add filtering for duplicate routes
API.alias("/channels/@me", "/api/content/index.html");
API.route(
  "/api/content/",
  (route) => new SiteService(route, "./dist/lib/wyvern/"),
);
API.route(
  "/api/v1/channels/",
  // TODO: rename to ChannelService
  (route) => new MessageService(route),
);
API.route("/api/v1/users/", (route) => new UserService(route));
API.route("/api/v1/auth/", (route) => new AuthService(route));
