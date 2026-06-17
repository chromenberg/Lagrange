import "./_Init.js";
import { eventLoopUtilization} from "node:perf_hooks";
import { Logger, LogLevel } from "./lib/core/logging/Logger.js";
import { Gateway } from "./lib/lagrange/modules/gateway/Gateway.js";
new Gateway()
Logger.setLogLevel(LogLevel.Verbose);

// IF YOU ARE CAUGHT IMPORTING MAJOR THINGS FROM THE PROJECT INTO HERE YOU WILL BE KILLED
(() => {
  console.log("autoexec running");
  let lastLoop = eventLoopUtilization();
  const interval = 5_000;
  
  setInterval(() => {
    const loop = eventLoopUtilization(lastLoop);
    Logger.sendLog(
      LogLevel.Debug,
      ["Process", "EventLoopUtil"],
      `Utilization in the past ${interval}ms. ` +
        `Idle: ${Math.trunc(loop.idle)}ms, ` +
        `Active: ${Math.trunc(loop.active)}ms, ` +
        `Util: ${Math.trunc(loop.utilization * 10000)/100}%`,
    );

    lastLoop = eventLoopUtilization();
  }, interval);
})();
