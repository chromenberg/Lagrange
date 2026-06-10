
import { __api, initGateway, initAtlas, __pubsub } from "./lib/lagrange/LagrangeInit.js";

export const API = __api;
export const PubSub = __pubsub;
export const Atlas = initAtlas()
// export const Gateway = initGateway();
