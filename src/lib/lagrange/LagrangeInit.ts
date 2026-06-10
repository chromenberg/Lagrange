// import { API } from "./modules/rest/REST.js";
// import { Gateway } from "./gateway/Gateway.js";
// import { Atlas } from "../atlas/AtlasManager.js";

// export const gateway = new Gateway();
// export const atlas = new Atlas();
// export const api = API;

// export function init():void {}
import { Gateway } from "./gateway/Gateway.js";
import { PubSub } from "../core/pubsub/PubSub.js";
import { Router } from "./modules/rest/Router.js";
import { Atlas } from "../atlas/AtlasManager.js";

export function initAtlas() {
  return new Atlas();
}
export const __pubsub = new PubSub();
export const __api = new Router();
export function initGateway() {
  return new Gateway();
}
