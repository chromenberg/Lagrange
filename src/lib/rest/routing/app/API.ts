import type { IncomingMessage } from "http";
import { V1Router } from "./api/V1.js"
import { SerLogger, LogLevels } from "../../../Logging.js";


export function APIRouter(url: [string | undefined, string[]], request: IncomingMessage) {
    if (url[0] === "v1") {
        SerLogger.log(LogLevels.Verbose, "[API -> V1] Requested URL wants to use the V1 API");
        V1Router([url[1].shift(), url[1]], request);
    }
}