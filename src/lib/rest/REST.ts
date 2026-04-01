import { Server } from "http"
import { Config } from "../Config.js"
import { LogLevels, SerLogger } from "../Logging.js";

const HTTPServer = new Server().listen(Config.REST.Port, Config.REST.Address);

HTTPServer.on("request", (req) => {
    SerLogger.log(LogLevels.Verbose, "[REST] Got a request for",req.url)
    SerLogger.log(LogLevels.Verbose, "[REST] Request data:",req.read())

})