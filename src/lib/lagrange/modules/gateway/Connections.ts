import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import { CountdownMap } from "../../../core/structs/CountdownMap.js";
import { Config } from "../../Config.js";
import { ClientConnection } from "./Connection.js";

export const ClientConnections = (()=>{
  Logger.sendLog(LogLevel.Info, ["LAGRANGE", "Gateway"], "Initializing Client Timeouts - (CountdownMap)")
  return new CountdownMap<ClientConnection>(
    Config.Gateway.Heartbeating.DisconnectAfterPulseLostTime,
  )
})();


