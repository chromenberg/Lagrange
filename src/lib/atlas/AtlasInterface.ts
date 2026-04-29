import { createServer, Server, Socket, connect } from "net";
import { Logger, LogLevel } from "../../../../Common/Logging/dist/Logger.js";
import { unlinkSync } from "fs";

// todo: cleanup and make proper service

export function connectAtlas(): Socket {
    const sock = connect({
        path: "/tmp/WyvernSockets/Atlas",
    });
    sock.on("ready", ()=>{
        console.log("lagrange ready")
    })

    process.on("SIGINT", (code) => {
        Logger.sendLog(LogLevel.Info, ["Process", "BeforeExit", "LAGRANGE"], "Disconnecting ATLAS Socket");
        unlinkSync("/tmp/WyvernSockets/Atlas");
        process.exit(code)
    })

    return sock

}

export const AtlasSocket = connectAtlas();

AtlasSocket.on("data", (msg) => {
    Logger.sendLog(LogLevel.Verbose, ["ATLAS", "Socketing", "Lagrange-Atlas"], JSON.parse(msg as string));
})
enum AtlasRequestType {
    GetUserByID
}
interface AtlasRequest {
    type: AtlasRequestType
    data: {}
}

export function messageAtlas(data: AtlasRequest, callback: (res: any) => any) {
    AtlasSocket.write(JSON.stringify(data));
    AtlasSocket.once("data", (msg: string) => {
        callback(msg);
    })
}
