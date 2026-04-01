import { Server } from "http";
import { Config } from "../Config.js";
import { LogLevels, SerLogger } from "../Logging.js";
import {Route} from "./routing/Router.js";
const HTTPServer = new Server().listen(Config.REST.Port, Config.REST.Address);

HTTPServer.on("request", (req) => {
    SerLogger.log(LogLevels.Verbose, "[REST] Got a request for",req.url);
    SerLogger.log(LogLevels.Verbose, "[REST] Request data:",req.read());
    Route(req.url, req);
})