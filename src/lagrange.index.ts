import { Config } from "./lib/lagrange/Config.js";
// import {init} from "./lib/lagrange/Lagrange.js"
import { Logger, LogLevel } from "../../Common/Logging/dist/Logger.js";
import "./lib/lagrange/modules/rest/REST.js";
import { Atlas } from "./lib/atlas/AtlasManager.js";
import { API } from "./lib/lagrange/modules/rest/REST.js";
import { Gateway } from "./lib/lagrange/gateway/Gateway.js";
export const Atlasmanager = null
// todo: refactor entire project
// init()
const api = API
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
    //fetch("http://127.0.0.1/");
    // //fetch("/hi");
    console.log(api.listeners("request"))

    //! Router no longer understands requests that dont have parameters
    //! TODO: Fix this as soon as possible
    api.getRaw("/test", (req, res) => {
        console.log("test endpoint")
        res.setHeader("content-type", "application/json")
        res.write(JSON.stringify({
            name: "hppi"
        }))
        res.end()
    })
    //! Problem during initialization of requests
    API.get("/", (req,res)=> {
        res.setHeader("content-type", "application/json");
        res.write(JSON.stringify({
            name: "hi"
        }))
        res.end()
    });

    API.get("/:param/hi", (req,res)=> {
        res.setHeader("content-type", "application/json");
        res.write(JSON.stringify({
            name: "hi" + req.params["param"]
        }))
        res.end()
    });

},1_000)
