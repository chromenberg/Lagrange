import { Config } from "./lib/Config.js";
import { Gateway } from "./lib/gateway/Gateway.js";
import { Logger, LogLevel } from "../../Common/Logging/dist/Logger.js";
import "./lib/modules/rest/REST.js";

// todo: refactor entire project

const gateway = new Gateway();

setTimeout(()=>{

    const client = new WebSocket(`ws://${Config.Gateway.Socket.Address}:${Config.Gateway.Socket.Port}`);
    client.onmessage = (message) => {
        try {
            Logger.sendLog(LogLevel.Info, ["LAGRANGE", "DummyClient"], JSON.parse(message.data))
        } catch (e) {
            Logger.sendLog(LogLevel.Error, ["LAGRANGE", "DummyClient"], e)
        }
        if(JSON.parse(message.data).opCode === 10) {client.send(JSON.stringify({
            opCode: 2,
            data:{
                a:"hi i want to identify"
            }
        }))}
    }
    // fetch("http://127.0.0.1/api/v1/users/1/profile");
    // fetch("http://127.0.0.1/api/v1/message");
    // //fetch("/hi");
},1_000)
import "./lib/modules/gateway/Gateway.js"