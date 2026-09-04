import { Atlas, Gateway } from "../../../_Init.js";

import type { Snowflake, User } from "../../../core/types/Types.js";
import type { Member } from "../../../core/types/UserTypes.js";

import { GatewayEventTypes } from "./GatewayEvents.js";

interface MessageCreateData {
  guild: Snowflake;
  channel: Snowflake;
  // we use member as guilds exist
  author: Partial<{
    user_id: Snowflake
    email: string
    password: string
    token: string
    username: string
    display_name: string
    avatar_hash: string
  }>;
  content: string;
}

process.on("gatewayInit", () => {
  console.log("message create event done")
  Gateway.addEvent(
    GatewayEventTypes.MESSAGE_CREATE,
    (data: MessageCreateData) => {
      console.log("bemssage");
      // get message id then format the data to the message events data
      const messageID = Atlas.requests.messages.requestMessageID().toString();
      const formatted = {
        author: {
          author_id: data.author?.user_id,
          username: data.author?.username,
          display_name: data.author?.display_name,
        },
        channel: data.channel,
        message_id: messageID,
        content: data.content,
      };

      // send the gateway event
      Gateway.channelEvent(
        data.guild,
        data.channel,
        GatewayEventTypes.MESSAGE_CREATE,
        formatted,
      );
    },
  );
});
