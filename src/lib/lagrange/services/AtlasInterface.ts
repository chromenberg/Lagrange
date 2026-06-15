import { Atlas } from "../../../_Init.js";
import type { Token, Snowflake } from "../../core/types/Types.js";
import type { types } from "cassandra-driver";


export namespace AtlasInterface {
  export namespace NoSQL {
    export async function Request(...args: any[]): Promise<types.ResultSet> {
      return Atlas.client.execute(args.join(" ") + ";");
    }
  
    export async function FilteringRequest(...args: any[]): Promise<types.ResultSet> {
      return Atlas.client.execute(args.join(" ") + " ALLOW FILTERING;");
    }
  
    export async function wrapExpectSingle(...args: any[]): Promise<types.Row[]> {
      const results = (await Request(args)).rows;
      if (results.length >= 1) {
        throw new Error("Expected ATLAS to send 1 result, got " + results.length);
      }
      return results;
    }
  }

  

  export namespace Users {
    export async function getSelfUserFromToken(token: Token) {

    }

    export async function getUser(id: Snowflake): Promise<types.Row[]> {
      return NoSQL.wrapExpectSingle(`SELECT * FROM users WHERE user_id = ${id};`);
    }

    // export async function getUserCredentials(email: EmailAddress, password: string)
    // export async function getUserCredentials(token: Token)
    export async function getUserCredentials(id: Snowflake) {
      const credentials = await NoSQL.wrapExpectSingle("SELECT * FROM credentials WHERE user_id =", id);
      return credentials;
    }
  }
}
