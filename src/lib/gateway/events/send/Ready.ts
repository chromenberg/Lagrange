import { Config } from "../../../Config.js";
import { GatewayEvent, GatewayEventTypes } from "../../../GatewayEvents.js";

export class GatewayEventReady extends GatewayEvent { // the data in this will need UNAVAILABLE_GUILD_OBJECT, APPLICATION_OBJECT, RESUME_GATEWAY_URL and USER INFO
    constructor() {
        super({
            eventType: GatewayEventTypes.READY,
            data: {
                apiVersion: 1, // integer determining api versioning of lagrange / discord
                user: "TO_BE_ADDED",
                guilds: "TO_BE_ADDED",
                session_id: "2730894572893475", // this will be a randomly generated string
                resume_gateway_url: "TO_BE_ADDED",
                shard: ["shard_id", "num_shards"], // will be optional if the client is sharding, sent when identifying
                application: "TO_BE_ADDED"
            }
        })
    } 
} 