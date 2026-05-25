import type { ServerResponse, IncomingMessage } from "node:http";
import type { Route } from "../modules/rest/router/Route.js";
import type { Request } from "../modules/rest/router/Router.js";

export class AuthService {
  private readonly route: Route;
  constructor(route: Route) {
    this.route = route;
    this.route.post("/register", (req, res) => { this.registerUser(req, res); });
  }

  public async registerUser(req: Request, res: ServerResponse<IncomingMessage>) {

  }
}
