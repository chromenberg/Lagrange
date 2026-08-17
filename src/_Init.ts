import { Logger, LogLevel } from "./lib/core/logging/Logger.js";
import { Config } from "./lib/lagrange/Config.js";
import "./lib/lagrange/modules/events/GatewayEvents.js";
import {
  __api,
  initGateway,
  __pubsub,
  __atlas,
} from "./lib/lagrange/LagrangeInit.js";
import "./lib/atlas/tables/TableAggregate.js"

Logger.setLogLevel(LogLevel.Debug);

const ConfigInfo = [
  `--- GATEWAY ---\n`,
  `Gateway Address: ${Config.Gateway.Socket.Address}\n`,
  `Gateway Port: ${Config.Gateway.Socket.Port}\n`,
  `Heartbeat Interval: ${Config.Gateway.Heartbeating.ExpectedTimeBetweenBeat/1000}s\n`,
  `Heartbeat Disconnect After: ${Config.Gateway.Heartbeating.DisconnectAfterPulseLostTime/1000}s\n`,
  `--- REST API ---\n`,
  `REST API Address ${Config.REST.Address}\n`,
  `REST API Port ${Config.REST.Port}`,
];
Logger.sendLog(LogLevel.Info, ["INIT", "Config"], ...ConfigInfo);

export const API = __api;
API.listen(Config.REST.Address, Config.REST.Port);

export const Atlas = __atlas;

export const PubSub = __pubsub;
export const Gateway = initGateway();
