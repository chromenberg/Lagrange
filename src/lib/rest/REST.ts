import { Server } from "http";
import { Config } from "../Config.js";
import { LogLevels, SerLogger } from "../Logging.js";
import {Router} from "./routing/Router.js";
const HTTPServer = new Server().listen(Config.REST.Port, Config.REST.Address);
/*
Each file is a specific part of the api, it dictates a folder basically
the request gets passed on down to each file and checks the current request path before consuming it and routing to the right module

this is probably really bad when it comes to stack hammering but who cares, it can be reimplemented later down the road
i say this because i need to call functions within functions and then get their responses which will most likely also include promises
so then there will be a massive amount of calls and returns
*/
HTTPServer.on("request", (req) => {
    SerLogger.log(LogLevels.Verbose, "[REST -> Routing] Got a request for",req.url);
    Router(req.url?.replace("/",""), req);
})