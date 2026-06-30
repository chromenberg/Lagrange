import type { IncomingMessage, ServerResponse } from "http";
import { Route } from "../modules/rest/Route.js";
import type { Request } from "../modules/rest/Router.js";
import { emitEvent, pubSub } from "../modules/gateway/PubSubHandler.js";
import { HTTPReader } from "../modules/rest/HTTPReader.js";
import type { GuildCreateObj } from "../interfaces/Guilds.js";
import { Atlas } from "../../../_Init.js";
import type { GuildData } from "../../core/types/FeatureTypes.js";

export class GuildService {
  private readonly route: Route;
  //private readonly services: ServiceList;
  constructor(
    route: Route,
    // services: ServiceList
  ) {
    this.route = route;
    // this.services = services;
    // -----------------------

    this.route.post("/", (req, res) => {
      this.newGuild(req, res);
    });
    
    this.route.get("/:id/invites/new", (req, res) => {
      this.newInviteCode(req, res);
    });
  }

  // should have a guild name as of right now
  public async newGuild(req: Request, res: ServerResponse<IncomingMessage>) {
    HTTPReader.parseBody(req).then((body) => {
      console.log(body);
      // TODO: Clean this up
      if (
        Object.hasOwn(body as Record<string, any>, "id") &&
        Object.hasOwn(body as Record<string, any>, "name")
      ) {
        (body as GuildData).owner_id = atob(
          req.headers.authorization?.split(".")[0] ?? "",
        );
        (body as GuildData).channels = [];
        (body as GuildData).roles = [];
        Atlas.requests.guilds.newGuild(body as GuildData);
      }
    });
  }

  public newInviteCode(req: Request, res: ServerResponse<IncomingMessage>) {
    const code = Atlas.requests.guilds.newInvite(req.params.id)
    res.setHeader("content-type", "application/json")
    res.write(JSON.stringify({invite_code: code}))
    res.end()
  }
}
