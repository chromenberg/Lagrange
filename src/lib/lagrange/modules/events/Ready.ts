import { Atlas } from "../../../../_Init.js";
import type { GuildChannel } from "../../../core/types/GatewayTypes.js";
import type { UnavailableID } from "../../../core/types/GuildTypes.js";
import type { User } from "../../../core/types/Types.js";
import { GatewayEventReady } from "../../gateway/events/send/Ready.js";
import { eventPublisher } from "../../services/EventService.js";
import { initEvents } from "../event-helpers/ReadyHelper.js";
import { GatewayEmitter } from "../gateway/Gateway.js";
import { GatewayEventOpCodes, GatewayEventTypes } from "./GatewayEvents.js";
import { subscribeToMessages } from "./MessageCreate.js";
type ReadyUserObj = {
  guilds: UnavailableID[];
  user: User & { email: string };
};
eventPublisher.subscribe(GatewayEventTypes.READY, (data) => {
  Atlas.requests.users
    .getGuildChannelsForID((data.user as ReadyUserObj).user.id) // Get all guilds and channels the user is in
    .then((res) => {
      initEvents(data.cli, res as GuildChannel[] | undefined, data.user); // subscribe to events for all channels and guilds
      data.cli.send(new GatewayEventReady().setData(data.user).toJSON()); // send ready data
    });
});
