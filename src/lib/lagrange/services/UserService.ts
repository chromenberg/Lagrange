import type { IncomingMessage, ServerResponse } from "http";
import { Logger, LogLevel } from "../../../../../Common/Logging/dist/Logger.js";
import { AtlasInterface } from "./AtlasInterface.js";
import type { types } from "cassandra-driver";
import { SnowflakeNode } from "../../atlas/modules/snowflake/Snowflake.js";

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
          const userid = Snowflake.GenerateID();
          const addUserResult = await AtlasInterface.Request(
            `INSERT INTO users (user_id, display_name, username) VALUES (${userid}, '${username}', '${username}');`
          );
          const addUserAuthResult = await AtlasInterface.Request(
            `INSERT INTO credentials (user_id, pass, email) VALUES (${userid}, '${password}', '${email}')`
          )
          console.log(addUserAuthResult.rows, addUserResult.rows);
          res({authres: addUserAuthResult, addres: addUserResult})
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
