import { Config } from "../../../Config.js";
import { GatewayEvent, GatewayEventOpCodes } from "../GatewayEvents.js";

export class GatewayEventHello extends GatewayEvent {
    constructor() {
        super({
            opCode: GatewayEventOpCodes.HELLO,
            data: {
                heartbeat_interval: Config.Gateway.Heartbeating.ExpectedTimeBetweenBeat
            }
        })
    } 
} 