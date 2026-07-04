import { Atlas } from "../../../_Init.js";
import type { Gateway } from "../gateway/Gateway.js";

/**
 * Holds the methods responsible for the API to communicate with the gateway
 */
export class GatewayService {
  constructor(
    private gateway: Gateway
  ) { }
  public validateIdentify(conn: any, data: any) {
    Atlas.requests.users.getUserByToken(data.token)
  }
  public resolveEvent(eventType: string, data: any) {
    // some shit about sending the event to the users affected
  }
}