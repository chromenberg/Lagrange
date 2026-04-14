import type { IncomingMessage } from "http";
import { LogLevels, SerLogger } from "../../Logging.js";
import { APIRouter } from "./app/API.js";


export function Router(url: string | undefined , request: IncomingMessage) {
    if (!url) {
        SerLogger.log(LogLevels.Warning, "[REST -> Routing] Received a request with no URL or no URL was passed, aborting");
        return; // reject request later on
    }
    const splitURL: string[] = url.split("/");

    if (splitURL.shift() === "api") { // checks if the desired request is for the api
        SerLogger.log(LogLevels.Verbose, "[Routing -> API] Requested URL wants to call the API");
        APIRouter([splitURL.shift(), splitURL], request);
    } 
}