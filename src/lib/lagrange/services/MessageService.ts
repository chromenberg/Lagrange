import type { IncomingMessage, ServerResponse } from "http";
import { Route } from "../modules/rest/Route.js";
import type { Request } from "../modules/rest/Router.js";
import { pubSub } from "../modules/gateway/PubSubHandler.js";
import { HTTPReader } from "../modules/rest/HTTPReader.js";
import { emitEvent } from "./EventService.js";
import { Atlas } from "../../../_Init.js";
import { Registry } from "../registries/LagrangeRegistry.js";
import { GatewayEmitter } from "../modules/gateway/Gateway.js";

interface ServiceList {
  DMService: DMMessageService;
}

export class DMMessageService {
  constructor() {}
}

export class MessageService {
  private readonly route: Route;
  //private readonly services: ServiceList;
  constructor(
    route: Route,
    // services: ServiceList
  ) {
    this.route = route;
    // this.services = services;
    // -----------------------

    this.route.post("/:id/messages", (req, res) => {
      this.createMessage(req, res);
    });
    this.route.patch("/:id/messages/:mid", (req, res) => {
      this.editMessage(req, res);
    });
    this.route.delete("/:id/message/:mid", (req, res) => {
      this.deleteMessage(req, res);
    });
  }

  public async editMessage(
    req: Request,
    res: ServerResponse<IncomingMessage>,
  ) {}

  public async createMessage(
    req: Request,
    res: ServerResponse<IncomingMessage>,
  ) {
    if (!req.headers.authorization) {
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({ error: 1, message: "Invalid authorization token" }),
      );
      res.end();
      return;
    }
    // indentation hell
    Atlas.requests.users
      .getUserByToken(req.headers.authorization)
      .then((user) => {
        HTTPReader.parseBody(req).then((body: any) => {
          if (!user) return; // add more handling for this

          const channelID: string = req.params.id;
          const guildID: string = Registry.fetch("inverseChannelMap")?.get(channelID);

          // a message create event should have a body, a channel id and an auth token
          GatewayEmitter.getChannel(guildID, channelID)?.publish(
            "MESSAGE_CREATE",
            {
              author: {
                author_id: user.user_id,
                username: user.username,
                display_name: user.display_name,
              },
              channel_id: req.params.id, // we need to check if the user can access this
              message_id: Atlas.requests.messages.requestMessageID().toString(),
              content: body.content,
            },
          );
        });
      });
    res.statusCode = 200;
  }
  public async deleteMessage(
    req: Request,
    res: ServerResponse<IncomingMessage>,
  ) {}
}
