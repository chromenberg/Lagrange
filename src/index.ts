import { Config } from "./lib/Config.js";
import { Gateway } from "./lib/Gateway.js";
import { CliLogger, LogLevels } from "./lib/Logging.js";

const gateway = new Gateway();

setTimeout(()=>{

    const client = new WebSocket(`ws://${Config.Gateway.Socket.Address}:${Config.Gateway.Socket.Port}`);
    client.onmessage = (message) => {
        try {
            CliLogger.log(LogLevels.Info, JSON.parse(message.data))
        } catch (e) {
            CliLogger.log(LogLevels.Error, e)
        }
        if(JSON.parse(message.data).opCode === 10) {client.send(JSON.stringify({
            opCode: 2,
            data:{
                a:"hi i want to identify"
            }
        }))}
    }

},1_000)
