import type { IncomingMessage, ServerResponse } from "http";
import { Route } from "../modules/rest/Route.js";
import type { Request } from "../modules/rest/Router.js";
import { emitEvent, pubSub } from "../modules/gateway/PubSubHandler.js";
import { HTTPReader } from "../modules/rest/HTTPReader.js";
import type { GuildCreateObj } from "../interfaces/Guilds.js";
import { Atlas, Gateway } from "../../../_Init.js";
import type { GuildData } from "../../core/types/FeatureTypes.js";
import type { Snowflake } from "../../core/types/Types.js";
// import { GatewayEmitter } from "../modules/gateway/Gateway.js";
import type { Server } from "ws";
import { GatewayEventTypes } from "../modules/events/GatewayEvents.js";

export class GuildService {
  private readonly route: Route;
  //private readonly services: ServiceList;
  constructor(
    route: Route,
    // services: ServiceList
  ) {
    this.route = route;
    // this.services = services;
    // -----------------------

    this.route.post("/", (req, res) => {
      console.log("sddfsg");
      this.newGuild(req, res);
    });

    this.route.get("/:id/invites/new", (req, res) => {
      this.newInviteCode(req, res);
    });

    this.route.get("/:id/channels", (req, res) => {
      this.getGuildChannels(req, res);
    });
  }

  // should have a guild name as of right now
  public async newGuild(req: Request, res: ServerResponse<IncomingMessage>) {
    console.log("gdfgdfgsdf");
    HTTPReader.parseBody<GuildData>(req).then((body) => {
      console.log(body);
      // TODO: Clean this up
      // TODO: Rewrite the request system, new method to check if the body has certain fields
      if (
        Object.hasOwn(body as Record<string, any>, "id") &&
        Object.hasOwn(body as Record<string, any>, "name")
      ) {
        console.log("new guild");
        // FIX: An invalid token could slip through and cause this to break
        body.owner_id = atob(req.headers.authorization?.split(".")[0] ?? "");
        body.channels = [];
        body.roles = [];

        Atlas.requests.guilds.newGuild(body).then((guild) => {
          // Send the guild create event to the owner id
          // Event type Guild Create
          // with the data of the guild that was made
          Gateway.emitEvent(
            GatewayEventTypes.GUILD_CREATE,
            guild.JSON(),
          );
        });
      }
      res.write("dfgdfg");
      res.end();
    });
  }

  public newInviteCode(req: Request, res: ServerResponse<IncomingMessage>) {
    const code = Atlas.requests.guilds.newInvite(req.params.id);
    res.setHeader("content-type", "application/json");
    res.write(JSON.stringify({ invite_code: code }));
    res.end();
  }

  public addGuildMember(guildID: Snowflake, userID: Snowflake) {}

  public getGuildChannels(req: Request, res: ServerResponse<IncomingMessage>) {
    Atlas.requests.guilds.getChannels(req.params.id).then((channels) => {
      const channelMap = channels?.map((channel) => {
        return {
          id: channel.channel_id?.toString(),
          name: channel.channel_name,
          index: channel.channel_index?.toString(),
          type: "text",
        };
      });

      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(channelMap));
      res.end();
    });
  }
}
