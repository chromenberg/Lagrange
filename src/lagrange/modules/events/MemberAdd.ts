import { Gateway } from "../../../_Init.js";
import type { GuildTemplate } from "../../../atlas/modules/templates/GuildTemplate.js";
import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import type { Guild } from "../../../core/types/GuildTypes.js";
import type { Snowflake } from "../../../core/types/Types.js";
import type { Member, User } from "../../../core/types/UserTypes.js";
import { GatewayEventTypes } from "./GatewayEvents.js";

interface GuildMemberAddEvent {
  user: User;
  guild: Guild;
}

process.on("gatewayInit", () => {
  Gateway.addEvent(GatewayEventTypes.GUILD_MEMBER_ADD, (data: GuildMemberAddEvent, eventName) => {
    Logger.sendLog(LogLevel.Verbose, ["Events"], eventName)


    // This is sent to the user who is joining the guild
    Gateway.userEvent(
      data.user.id,
      GatewayEventTypes.GUILD_CREATE,
      data.guild,
    );
    
    // This is sent to the members who are already in the guild
    Gateway.guildEvent(
      data.guild.id,
      eventName,
      data.user,
    );
  });
});
