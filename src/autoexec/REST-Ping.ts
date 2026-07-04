import { API } from "../_Init.js";
import { Logger, LogLevel } from "../lib/core/logging/Logger.js";
setInterval(() => {
Logger.sendLog(LogLevel.Verbose, ["Sentinel", "API"], "Listeners for API:", API.listeners("/api/v1/messages/"))
  
}, 10_000)