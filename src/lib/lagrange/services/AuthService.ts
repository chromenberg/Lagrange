import type { ServerResponse, IncomingMessage } from "node:http";
import type { Route } from "../modules/rest/router/Route.js";
import type { Request } from "../modules/rest/router/Router.js";
import { HTTPReader } from "../modules/rest/router/HTTPReader.js";
import { AtlasManager } from "../../../atlas.index.js";

export class AuthService {
  private readonly route: Route;
  constructor(route: Route) {
    this.route = route;
    this.route.post("/register", (req, res) => { this.registerUser(req, res); });
  }

  public async registerUser(req: Request, res: ServerResponse<IncomingMessage>) {
    HTTPReader.parseBody(req).then((body) => {
      // contains username, email, password
      const data = JSON.parse(body as string)
      console.log(data)
      
      AtlasManager.requests.users.signUp(data).then((creds) => {
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify(creds))
        res.end()
      })
    })
  }
}
