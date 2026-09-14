import { Gateway } from "../../../_Init.js";
import type { GuildTemplate } from "../../../atlas/modules/templates/GuildTemplate.js";
import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import type { Guild } from "../../../core/types/GuildTypes.js";
import type { Snowflake } from "../../../core/types/Types.js";
import type { Member } from "../../../core/types/UserTypes.js";
import { GatewayEventTypes } from "./GatewayEvents.js";

interface GuildMemberAddEvent {
  member: Member;
  guild: Snowflake;
}

process.on("gatewayInit", () => {
  Gateway.addEvent(GatewayEventTypes.GUILD_MEMBER_ADD, (data: GuildMemberAddEvent, eventName) => {
    Logger.sendLog(LogLevel.Verbose, ["Events"], eventName)
    // send the gateway event
    Gateway.guildEvent(
      data.guild,
      eventName,
      data.member,
    );
  });
});
