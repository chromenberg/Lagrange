import { Logger, LogLevel } from "./lib/core/logging/Logger.js";
import { Config } from "./lib/lagrange/Config.js";
import "./lib/lagrange/modules/events/GatewayEvents.js"
import {
  __api,
  initGateway,
  __pubsub,
  __atlas,
  __gatewayEmitter
} from "./lib/lagrange/LagrangeInit.js";

Logger.setLogLevel(LogLevel.Debug);

export const API = __api;
export const Atlas = __atlas;
export const PubSub = __pubsub;
export const Gateway = initGateway();
export const GatewayEmitter = __gatewayEmitter
console.log(GatewayEmitter)

API.listen(Config.REST.Address, Config.REST.Port);
