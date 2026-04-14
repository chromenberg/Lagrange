import type { IncomingMessage } from "http";
import { LogLevels, SerLogger } from "../../../../../Logging.js";

export function PostMessage(url: [string | undefined, string[]], request: IncomingMessage) {
    SerLogger.log(LogLevels.Verbose, "[V1 -> PostMessage] Requested URL is sending a POST request for MESSAGE:", request.read());
}