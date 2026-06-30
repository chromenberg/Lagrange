import type {
  EmailAddress,
  SignupResponse,
  Snowflake,
  SQLPromise,
  Token,
  UserCreds,
  UserSignupData,
} from "../../../core/types/Types.js";
import type { Atlas } from "../../AtlasManager.js";
import { AtlasDB } from "../../Configs/Config.js";
import { GenToken } from "../crypt/Crypt.js";

// TODO: Unify some of these imports

import { SnowflakeNode, WorkerIDs } from "../snowflake/Snowflake.js";
import { SQLDatabase } from "../sql/SQL.js";
import { toAtlasBase, hexDate } from "./Requests.js";
import { AtlasChild } from "./AtlasChild.js";

import { createHmac, scryptSync } from "crypto"; // TODO: this could be something to make in rust
import { DBErrors } from "../../../core/errors/DBErrors.js";
import {
  GatewayErrorCodes,
  GatewayErrors,
} from "../../../core/errors/ServerErrors.js";

// TODO: reduce import counts

export class AuthService extends AtlasChild {
  protected snowflake: SnowflakeNode;
  constructor(parent: Atlas, snowflake?: SnowflakeNode) {
    super(parent);

    // If we havent given the user service a snowflake node already then we will generate one
    // with the defaults for a user service
    this.snowflake = snowflake
      ? snowflake
      : SnowflakeNode({
          workerBits: 10,
          workerID: WorkerIDs.MAIN_WORKER,
          sequenceBits: 13,
          // user ids should be represented as strings in JS to prevent conversion
          startEpoch: AtlasDB.Snowflake.StartEpoch,
        });
  }

  public newTokenForUser({ email, password }: UserCreds): Promise<string> {
    return new Promise((res) => {
      // Get user based off of email and password
      this.parent.sqlClient
        .get`SELECT user_id FROM users WHERE email = ${email} AND password = ${password};`.then(
        (resp) => {
          // if response is undefined or the user id is not present then return
          if (!resp || !resp.user_id?.toString()) {
            return;
          }
          // Generate new token with the user id found from the login info
          res(this.services.users.newAuthToken(resp.user_id.toString()));
        },
      );
    });
  }
}
