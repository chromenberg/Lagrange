import type { Gateway } from "../gateway/Gateway.js";

/**
 * Holds the methods responsible for the API to communicate with the gateway
 */
export class GatewayService {
  constructor(
    private gateway: Gateway
  ) { }

  public resolveEvent(eventType: string, data: any) {
    // some shit about sending the event to the users affected
  }
}