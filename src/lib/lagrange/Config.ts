import { Gateway } from "./gateway/GatewayConfig.js";
import { REST } from "./modules/rest/RESTConfig.js";
import { S3Credentials } from "../../TEMPS3CONFIG.js";
export const Config = {
  Gateway: Gateway,
  REST: REST,
  CDN: S3Credentials
}