import type { IncomingMessage, ServerResponse } from "node:http";
import type { Request } from "../../../../Router.js";

export function fetchSelfClient(req: Request, res: ServerResponse<IncomingMessage>): void {
    // look at the token of the user
    // check if token is fully valid by checking active tokens from that user
    // fetch the user from postgres
    // get servers, friends, profile info

    // if needed we can fetch the active tokens from postgres and then fetch the user info from scylla
}