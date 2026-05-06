import { Logger, LogLevel } from "../../../../../../Common/Logging/dist/Logger.js";
import { Router } from "./Router.js";
//import { AtlasSocket, messageAtlas } from "../../atlas/AtlasInterface.js";

export const API = new Router(); // export api for the sake of interfacing in other places
console.log("api")
API.listen("127.0.0.1", 80);


API.get("/api/v1/users/@me", (req, res) => {
    console.log("Users @me endpoint called")
})
