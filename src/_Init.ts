import { Logger, LogLevel } from "./lib/core/logging/Logger.js";
import { Config } from "./lib/lagrange/Config.js";
import {
  __api,
  initGateway,
  __pubsub,
  __atlas,
} from "./lib/lagrange/LagrangeInit.js";

Logger.setLogLevel(LogLevel.Debug);

export const API = __api;
export const Atlas = __atlas;
export const PubSub = __pubsub;
export const Gateway = initGateway();

API.listen(Config.REST.Address, Config.REST.Port);
