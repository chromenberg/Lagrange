import type { IncomingMessage, ServerResponse } from "http";
import { Route } from "../modules/rest/router/Route.js";
import type { Request } from "../modules/rest/router/Router.js";
import { emitEvent, pubSub } from "../modules/gateway/PubSubHandler.js";
import { HTTPReader } from "../modules/rest/router/HTTPReader.js";
import type { GuildCreateObj } from "../interfaces/Guilds.js";


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

    this.route.post(
      "/guilds",
      (req, res) => { this.newGuild(req, res) }
    );

  }

  // should have a guild name as of right now
  public async newGuild(
    req: Request,
    res: ServerResponse<IncomingMessage>
  ) {
    HTTPReader.parseBody(req).then((body) => {
      (body as GuildCreateObj)
    })
  }

}
