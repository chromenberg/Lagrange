import { Gateway } from "../../../../_Init.js";
import type { Guild } from "../../../core/types/GuildTypes.js";
import { GatewayEventTypes } from "./GatewayEvents.js";

process.on("gatewayInit", () => {
  Gateway.addEvent(GatewayEventTypes.GUILD_CREATE, (data: Guild) => {
    // send the gateway event
    Gateway.userEvent(
      data.properties.owner_id,
      GatewayEventTypes.GUILD_CREATE,
      data,
    );
  });
});
