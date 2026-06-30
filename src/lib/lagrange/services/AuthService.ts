import type { ServerResponse, IncomingMessage } from "node:http";
import type { Route } from "../modules/rest/Route.js";
import type { Request } from "../modules/rest/Router.js";
import { HTTPReader } from "../modules/rest/HTTPReader.js";
import { Atlas } from "../../../_Init.js";
import type { UserCreds, UserSignupData } from "../../core/types/Types.js";
import { IErrorEnum, InternalErrors } from "../../core/errors/ServerErrors.js";

export class AuthService {
  private readonly route: Route;
  constructor(route: Route) {
    this.route = route;
    this.route.post("/register", (req, res) => {
      this.registerUser(req, res);
    });
    this.route.post("/login", (req, res) => {
      this.loginUser(req, res);
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
          Atlas.requests.users.signUp(body as UserSignupData).then((creds) => {
            // TODO: streamline this more, create smt to manage all this
            console.log(creds);
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify(creds));
            res.end();
          });
        });
    });
  }

  public async loginUser(req: Request, res: ServerResponse<IncomingMessage>) {
    HTTPReader.parseBody(req).then((parsedBody) => {
      // If there is no email or password then do not continue authentication
      if (
        !(parsedBody as UserCreds).email ||
        !(parsedBody as UserCreds).password
      ) {
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(InternalErrors[IErrorEnum.MalformedAPIData]));
        res.end();
        return;
      }
      
      Atlas.requests.auth
        .newTokenForUser(parsedBody as UserCreds)
        .then((token) => {
          // Write JSON header and then send token back
          res.setHeader("Content-Type", "application/json");
          res.write(JSON.stringify({ token }));
          res.end();
        });
    });
  }
}
