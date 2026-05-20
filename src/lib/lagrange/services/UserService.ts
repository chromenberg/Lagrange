import type { IncomingMessage, ServerResponse } from "http";
import { Logger, LogLevel } from "../../../../../Common/Logging/dist/Logger.js";
import { AtlasInterface } from "./AtlasInterface.js";
import type { types } from "cassandra-driver";
import { SnowflakeNode } from "../../atlas/modules/snowflake/Snowflake.js";
import { Atlas } from "../../atlas/AtlasManager.js";
import { AtlasManager } from "../../../atlas.index.js";
import type { ATLAS } from "../../../common/Typings.js";
import type { Route } from "../modules/rest/router/Route.js";
import type { Request } from "../modules/rest/router/Router.js";

const Snowflake = SnowflakeNode({
  workerBits: 10,
  sequenceBits: 12,
  startEpoch: 1767225600000,
  workerID: 1,
})

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
          
          res([(await signUpResult[0]), (await signUpResult[1])])
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
    }

    export async function CheckAvailability(username: string): Promise<AvailabilityResult> {
      return new Promise((res, err) => {
        Logger.sendLog(LogLevel.Caution, ["LAGRANGE", "UserService", "CheckAvailability"], "Using ALLOW FILTERING, this can damage performance");

        AtlasInterface.FilteringRequest("SELECT * FROM users WHERE username = '" + username + "'").then(result => {
          Logger.sendLog(LogLevel.Info, ["LAGRANGE", "UserService", "CheckAvailability"], "CheckAvailability Called. Result:", result.rows);
          res({
            isAvailable: result.rows[0] ? false : true, // if not present then name is available
            checkedName: username,
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