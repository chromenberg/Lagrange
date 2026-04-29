import { createServer, Server } from "net";
import { Logger, LogLevel } from "../../../../Common/Logging/dist/Logger.js";
import { unlinkSync } from "fs";

// todo: cleanup and make proper service

export function connectAtlas(): Server {
    const sock = createServer();
    sock.listen("/tmp/WyvernSockets/Atlas", () => {
        console.log("Connected");
    })
    sock.on("message", (msg) => {
        Logger.sendLog(LogLevel.Verbose, ["ATLAS", "Socketing", "Lagrange-Atlas"], msg.toJSON());
    })

    process.on("SIGINT", (code) => {
        Logger.sendLog(LogLevel.Info, ["Process", "BeforeExit", "LAGRANGE"], "Disconnecting ATLAS Socket");
        unlinkSync("/tmp/WyvernSockets/Atlas");
        process.exit(code)
    })

    return sock

}
