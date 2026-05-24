import type { IncomingMessage, ServerResponse } from "http";
import { Logger, LogLevel } from "../../core/logging/Logger.js";
import { AtlasInterface } from "./AtlasInterface.js";
import type { types } from "cassandra-driver";
import { SnowflakeNode } from "../../atlas/modules/snowflake/Snowflake.js";
import { Atlas } from "../../atlas/AtlasManager.js";
import { AtlasManager } from "../../../atlas.index.js";
import type { ATLAS } from "../../../common/Typings.js";
import type { Route } from "../modules/rest/router/Route.js";
import type { Request } from "../modules/rest/router/Router.js";
import type { SQLResponse } from "../../atlas/modules/sql/SQL.js";
import { HTTPReader } from "../modules/rest/router/HTTPReader.js";

const Snowflake = SnowflakeNode({
  workerBits: 10,
  sequenceBits: 12,
  startEpoch: 1767225600000,
  workerID: 1,
})

// TODO: remove
export namespace Auth {
  export async function SignUp(
    username: string,
    email: string,
    password: string
  ) {
    return new Promise((res, err) => {
      UserData.Usernames.CheckAvailability(username)
        .then(async (result) => {
          if (!result.isAvailable) {
            res({
              code: "ENOCODE",
              reason: "This username is already taken, please try another."
            });
            return;
          }
          
          const signUpResult = AtlasManager.requests.users.signUp({
            username: username,
            email: email as ATLAS.EmailAddress,
            password: password
          });
          
          res(signUpResult)
          // sign up code
        })
    })
  }
}

export namespace UserData {
  export namespace Usernames {
    interface AvailabilityResult {
      isAvailable: boolean
      checkedName: string
      result?: SQLResponse
    }

    export async function CheckAvailability(username: string): Promise<AvailabilityResult> {
      return new Promise((res, err) => {
        Logger.sendLog(LogLevel.Caution, ["LAGRANGE", "UserService", "CheckAvailability"], "Using ALLOW FILTERING, this can damage performance");

        AtlasManager.requests.users.getUserByUsername(username).then(result => {
          Logger.sendLog(LogLevel.Info, ["LAGRANGE", "UserService", "CheckAvailability"], "CheckAvailability Called. Result:", result);
          res({
            isAvailable: result ? false : true, // if not present then name is available
            checkedName: username,
            result: result
          });
        });
      })
    }
  }
}

export class UserService {
  private readonly route: Route;
  constructor(route: Route) {
    this.route = route;

    route.get("/@me", this.getCurrentUser);
  }

  public async getCurrentUser(
    req: Request,
    res: ServerResponse<IncomingMessage>
  ) {
    
  }

}

// TODO: move out to own file
export class AuthService {
  private readonly route: Route;
  constructor(route: Route) {
    this.route = route;
    console.log("aaaa")
    this.route.post("/register", (req, res) => { this.registerUser(req, res) });
  }

  public async registerUser(req: Request, res: ServerResponse<IncomingMessage>) {
    const body: any = await HTTPReader.parseBody(req);
    Auth.SignUp(body.username, body.email, body.password)
  }
}