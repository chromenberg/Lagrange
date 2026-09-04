import { Gateway } from "../../../_Init.js";
import type { GuildTemplate } from "../../../atlas/modules/templates/GuildTemplate.js";
import type { Guild } from "../../../core/types/GuildTypes.js";
import { GatewayEventTypes } from "./GatewayEvents.js";

process.on("gatewayInit", () => {
  Gateway.addEvent(GatewayEventTypes.GUILD_CREATE, (data: Guild) => {
    console.log("guild create event done");
      // @ts-ignore
    console.log(data)
    // send the gateway event
    Gateway.userEvent(
      data.properties.owner_id,
      GatewayEventTypes.GUILD_CREATE,
      data,
    );
  });
});
