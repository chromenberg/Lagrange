import type { IncomingMessage, ServerResponse } from "http";
import type { Route } from "../modules/rest/Route.js";
import type { Request } from "../modules/rest/Router.js";

export class UserService {
  private readonly route: Route;
  constructor(route: Route) {
    this.route = route;

    // FIXME: This conflicts with /channels/@me
    // route.get("/@me", this.getCurrentUser);
  }

  public async getCurrentUser(
    req: Request,
    res: ServerResponse<IncomingMessage>
  ) {}
}

