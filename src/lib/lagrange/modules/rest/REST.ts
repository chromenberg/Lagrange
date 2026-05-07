import { Logger, LogLevel } from "../../../../../../Common/Logging/dist/Logger.js";
import { Request, Router } from "./router/Router.js";
//import { AtlasSocket, messageAtlas } from "../../atlas/AtlasInterface.js";

export const API = new Router(); // export api for the sake of interfacing in other places
console.log("api")
API.listen("127.0.0.1", 80);


import type { IncomingMessage, ServerResponse } from "node:http";
namespace APITests {
    function respond(res: ServerResponse<IncomingMessage>, data: any, path: any) {
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({
            path: data,
            data
        }));
        res.end();
    }
    API.route("/test/api/v1", (route) => {
        route.get("/users/:param/profile", (req, res) => {
            respond(res, 200, "/test/api/v1/users/"+req.params.param+"/profile");
        })
        route.get("/users/@me", (req, res) => {
            respond(res, 200, "/test/api/v1/users/@me");
        })
    });
    
    API.route("/test/api/v2/", (route) => {
        route.get("/users/guilds", (req, res) => {
            respond(res, 200, "/test/api/v2/users/guilds");
        })
        route.get("/users/guilds/:param", (req, res) => {
            respond(res, 200, "/test/api/v2/users/guilds/"+req.params.param);
        })
    })
    
    API.route("/test/api/:param/users", (route) => {
        route.get("/:paramm", (req, res) => {
            respond(res, 200, "/test/api/"+req.params.param+"/"+req.params.paramm);
        })
    })
}
