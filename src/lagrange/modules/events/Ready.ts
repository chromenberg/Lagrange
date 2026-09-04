import { Atlas } from "../../../_Init.js";
import type {
  GuildChannel,
  ReadyUserObj,
} from "../../../core/types/GatewayTypes.js";
import { GatewayEventReady } from "../event-builders/Ready.js";
import { eventPublisher } from "../../services/EventService.js";
import { initEvents } from "../event-helpers/ReadyHelper.js";
import { GatewayEventTypes } from "./GatewayEvents.js";

eventPublisher.subscribe(GatewayEventTypes.READY, (data) => {
  initEvents(data.cli, data.user.guilds); // subscribe to events for all channels and guilds
  data.cli.send(new GatewayEventReady().setData(data.user).toJSON()); // send ready data
});
