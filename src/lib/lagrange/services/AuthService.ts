import type { ServerResponse, IncomingMessage } from "node:http";
import type { Route } from "../modules/rest/Route.js";
import type { Request } from "../modules/rest/Router.js";
import { HTTPReader } from "../modules/rest/HTTPReader.js";
import { Atlas } from "../../../_Init.js";
import type { UserSignupData } from "../../core/types/Types.js";

export class AuthService {
  private readonly route: Route;
  constructor(route: Route) {
    this.route = route;
    this.route.post("/register", (req, res) => {
      this.registerUser(req, res);
    });
  }
  
  // /auth/register
  public async registerUser(
    req: Request,
    res: ServerResponse<IncomingMessage>,
  ) {
    // contains username, email, password
    HTTPReader.parseBody(req).then((body) => {
      // TODO: cleanup
      Atlas.requests.users
        .checkUsernameAvailability((body as UserSignupData).username)
        // check if username is valid
        .then((valid) => {
          if (!valid) {
            // if invalid return an error
            res.setHeader("Content-Type", "application/json");
            res.write(
              JSON.stringify({ reason: "this username is already taken" }),
            );
            res.end();
            return;
          }
          // else signup the user
          Atlas.requests.users
            .signUp(body as UserSignupData)
            .then((creds) => {
              // TODO: streamline this more, create smt to manage all this
              console.log(creds);
              res.setHeader("Content-Type", "application/json");
              res.write(JSON.stringify(creds));
              res.end();
            });
        });
    });
  }
}
