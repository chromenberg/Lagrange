import { CountdownMap } from "../../../core/structs/CountdownMap.js";
import { Config } from "../../Config.js";

export const ClientConnections = new CountdownMap(
  Config.Gateway.Heartbeating.DisconnectAfterPulseLostTime,
);


