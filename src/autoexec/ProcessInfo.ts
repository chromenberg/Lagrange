import { eventLoopUtilization } from "perf_hooks";
import { Logger, LogLevel } from "../lib/core/logging/Logger.js";

(() => {
  console.log("autoexec running");
  let lastLoop = eventLoopUtilization();
  const interval = 15_000;
  
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
