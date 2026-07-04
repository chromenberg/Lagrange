import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import { CountdownMap } from "../../../core/structs/CountdownMap.js";
import { Config } from "../../Config.js";

export const ClientConnections = (()=>{
  Logger.sendLog(LogLevel.Info, ["LAGRANGE", "Gateway"], "Initializing Client Timeouts - (CountdownMap)")
  return new CountdownMap(
    Config.Gateway.Heartbeating.DisconnectAfterPulseLostTime,
  )
})();


