import type { IncomingMessage } from "http";
import { LogLevels, SerLogger } from "../../Logging.js";


export function Route(url: string | undefined , request: IncomingMessage) {
    if (!url) {
        SerLogger.log(LogLevels.Warning, "[Rest -> Routing] Received a request with no URL or no URL was passed");
    }
}