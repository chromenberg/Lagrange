import { connect, type Socket } from "net";
import type { Snowflake, Token } from "../../../atlas/modules/Types.js";
import { AtlasManager } from "../../../../atlas.index.js";
type foid = void
type UnixSocketEventMap = "message" | "close" | "connect" | "ready"

export namespace AtlasInterface {
    export namespace Users {
        export async function getSelfUserFromToken(token: Token) {
            
        }

        export async function getUser(id: Snowflake) {
            const results = (await AtlasManager.client.execute(`SELECT * FROM users WHERE user_id = ${id};`)).rows;
            
            if (results.length > 1) {
                throw new Error("Tried getting a user and got more than 1 result, this is a database fault");
            }

            return results;
        }
    }
}