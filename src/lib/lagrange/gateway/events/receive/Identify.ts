import { Config } from "../../../Config.js";
import { GatewayEvent, GatewayEventOpCodes } from "../GatewayEvents.js";


export class GatewayEventIdentify extends GatewayEvent {
    constructor() {
        super({
            opCode: GatewayEventOpCodes.IDENTIFY,
            data: {
                
            }
        })
    } 
} 