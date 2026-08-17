import { channel } from "node:process";
import { Atlas, Gateway } from "../../../../_Init.js";
import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import type { Snowflake } from "../../../core/types/Types.js";
import type { Member } from "../../../core/types/UserTypes.js";
import { eventPublisher } from "../../services/EventService.js";
import type { ClientConnection } from "../gateway/Connection.js";
import { GatewayEventTypes } from "./GatewayEvents.js";

interface MessageCreateData {
  guild: Snowflake;
  channel: Snowflake;
  // we use member as guilds exist
  author: Partial<Member>
  content: string;
}

Gateway.addEvent(GatewayEventTypes.MESSAGE_CREATE, (data: MessageCreateData) => {
  console.log("bemssage")
  // get message id then format the data to the message events data
  const messageID = Atlas.requests.messages.requestMessageID().toString()
  const formatted = {
    author: {
      author_id: data.author.user?.id,
      username: data.author.user?.username,
      display_name: data.author.user?.display_name,
      user: data.author.user
    },
    channel: data.channel,
    message_id: messageID,
    content: data.content
  }

  // send the gateway event
  Gateway.channelEvent(data.guild, data.channel, GatewayEventTypes.MESSAGE_CREATE, formatted)
})