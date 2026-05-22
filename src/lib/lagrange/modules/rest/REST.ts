import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import { Request, Router } from "./router/Router.js";
//import { AtlasSocket, messageAtlas } from "../../atlas/AtlasInterface.js";
export const API = new Router(); // export api for the sake of interfacing in other places
API.listen("127.0.0.1", 80);

import init from "./Routes.js";
init()
