import { Router } from "./router/Router.js";

// TODO: rework this in some way
export const API = new Router(); // export api for the sake of interfacing in other places
API.listen("127.0.0.1", 80);

import init from "./Routes.js";
init()
