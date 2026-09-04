import type { IncomingMessage, ServerResponse } from "http";
import { Route } from "../modules/rest/Route.js";
import type { Request } from "../modules/rest/Router.js";
import { emitEvent, pubSub } from "../modules/gateway/PubSubHandler.js";
import { HTTPReader } from "../modules/rest/HTTPReader.js";
import type { GuildCreateObj } from "../interfaces/Guilds.js";
import { Atlas } from "../../_Init.js";
import type { GuildData } from "../../core/types/FeatureTypes.js";
import { SQLDatabase } from "../../atlas/modules/sql/SQL.js";
// import { GatewayEmitter } from "../modules/gateway/Gateway2.js";

export class InviteService {
  private readonly route: Route;
  //private readonly services: ServiceList;
  constructor(
    route: Route,
    // services: ServiceList
  ) {
    this.route = route;
    // this.services = services;
    // -----------------------

    this.route.get("/:code", (req, res) => {
      this.joinByInvite(req, res);
    });
  }

  public joinByInvite(req: Request, res: ServerResponse<IncomingMessage>) {
    console.log(req.params.code);
    Atlas.requests.guilds.checkInvite(req.params.code).then(async (inv) => {
      if (!inv) return;
      if (!inv.guild_id?.toString()) return;
      
      Atlas.requests.guilds
        .addGuildMember(
          inv.guild_id.toString(),
          atob(req.headers.authorization?.split(".")[0] ?? ""),
        )
        .then(() => {
          if (!inv.guild_id?.toString()) return;

          // GatewayEmitter.getGuild(inv.guild_id?.toString())?.publish(
          //   "GUILD_MEMBER_ADD",
          //   atob(req.headers.authorization?.split(".")[0] ?? ""),
          // );
        });

      
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify(
          await SQLDatabase.toSafeJS(inv ?? { message: "No invite found" }),
        ),
      );
      res.end();
    });
  }
}
