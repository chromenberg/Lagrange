import type { IncomingMessage } from "node:http";
import { PostMessage } from "./v1/PostMessage.js";
import { LogLevels, SerLogger } from "../../../../Logging.js";

export function V1Router(url: [string | undefined, string[]], request: IncomingMessage) {
    if (url[0] === "message") {
        SerLogger.log(LogLevels.Verbose, "[V1 -> PostMessage] Requested URL for Message");
        PostMessage([url[1].shift(), url[1]], request);
    }
}