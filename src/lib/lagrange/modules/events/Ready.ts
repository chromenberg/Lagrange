import { Atlas } from "../../../../_Init.js";
import type { UnavailableID } from "../../../core/types/GuildTypes.js";
import type { User } from "../../../core/types/Types.js";
import { GatewayEventReady } from "../../gateway/events/send/Ready.js";
import { eventPublisher } from "../../services/EventService.js";
import { GatewayEmitter } from "../gateway/Gateway.js";
import { GatewayEventOpCodes, GatewayEventTypes } from "./GatewayEvents.js";
import { subscribeToMessages } from "./MessageCreate.js";
type ReadyUserObj = {
  guilds: UnavailableID[];
  user: User & { email: string };
};
eventPublisher.subscribe(GatewayEventTypes.READY, (data) => {
  console.log(data.user);
  // FIXME!!!!!: This is complete and utter dogshit
  Atlas.requests.users
    .getGuildChannelsForID((data.user as ReadyUserObj).user.id)
    .then((res) => {
      res?.forEach((guildChannel) => {
        subscribeToMessages(guildChannel, data.cli)
      });
      // send ready data

      (data.user as ReadyUserObj).guilds.forEach((guild) => {
        data.cli.subscribe(guild.id, (...args: any[]) => {
          console.log("New event for [" + data.user.user.id + "]", ...args);
        });
      });
      data.cli.send(new GatewayEventReady().setData(data.user).toJSON());
    });
});
