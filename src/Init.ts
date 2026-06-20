import "./_Init.js";
import { eventLoopUtilization} from "node:perf_hooks";
import { Logger, LogLevel } from "./lib/core/logging/Logger.js";
import { Gateway } from "./lib/lagrange/modules/gateway/Gateway.js";
new Gateway()
Logger.setLogLevel(LogLevel.Verbose);

// IF YOU ARE CAUGHT IMPORTING MAJOR THINGS FROM THE PROJECT INTO HERE YOU WILL BE KILLED
