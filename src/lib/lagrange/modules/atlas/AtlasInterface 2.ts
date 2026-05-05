// import { connect, type Socket } from "net";

// import { AtlasManager } from "../../../../atlas.index.js";
// import type { AsyncCallback, Atlas } from "../../../../common/Typings.js";
// import type { types } from "cassandra-driver";
// type foid = void
// type UnixSocketEventMap = "message" | "close" | "connect" | "ready"

// export namespace AtlasInterface {
//     export async function wrapExpectSingle(...args: any[]): Promise<types.Row[]> {
//         // const results = (await AtlasManager.client.execute(args.join(" "))).rows;

//         if (results.length >= 1) {
//             throw new Error("Expected ATLAS to send 1 result, got "+results.length)
//         }

//         return results;
//     }

//     export namespace Users {
//         export async function getSelfUserFromToken(token: Atlas.Token) {
            
//         }

//         export async function getUser(id: Atlas.Snowflake): Promise<types.Row[]> {
//             return wrapExpectSingle(`SELECT * FROM users WHERE user_id = ${id};`);
//         }

//         // export async function getUserCredentials(email: EmailAddress, password: string) 
//         // export async function getUserCredentials(token: Token) 
//         export async function getUserCredentials(id: Atlas.Snowflake) {
//             const credentials = await wrapExpectSingle("SELECT * FROM credentials WHERE user_id =", id);
//             return credentials
//         } 
//     }
// }