import { Atlas } from "../../../../_Init.js";
import type { GuildChannel, ReadyUserObj } from "../../../core/types/GatewayTypes.js";
import { GatewayEventReady } from "../../gateway/events/send/Ready.js";
import { eventPublisher } from "../../services/EventService.js";
import { initEvents } from "../event-helpers/ReadyHelper.js";
import { GatewayEventTypes } from "./GatewayEvents.js";

eventPublisher.subscribe(GatewayEventTypes.READY, (data) => {
  Atlas.requests.users
    .getGuildChannelsForID((data.user as ReadyUserObj).user.id) // Get all guilds and channels the user is in
    .then((res) => {
      initEvents(data.cli, res as GuildChannel[] | undefined, data.user.guilds); // subscribe to events for all channels and guilds
      data.cli.send(new GatewayEventReady().setData(data.user).toJSON()); // send ready data
    });
});
