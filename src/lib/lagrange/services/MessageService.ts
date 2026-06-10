import type { IncomingMessage, ServerResponse } from "http";
import { Route } from "../modules/rest/Route.js";
import type { Request } from "../modules/rest/Router.js";
import { emitEvent, pubSub } from "../modules/gateway/PubSubHandler.js";
import { HTTPReader } from "../modules/rest/HTTPReader.js";

interface ServiceList {
  DMService: DMMessageService
}

export class DMMessageService {
  constructor() { }
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

    this.route.post(
      "/:id/messages",
      (req, res) => { this.createMessage(req, res) }
    );
    this.route.patch(
      "/:id/messages/:mid",
      (req, res) => { this.editMessage(req, res) }
    );
    this.route.delete(
      "/:id/message/:mid",
      (req, res) => { this.deleteMessage(req, res) }
    );
  }

  public async editMessage(
    req: Request,
    res: ServerResponse<IncomingMessage>
  ) {

  }

  
  public async createMessage(
    req: Request,
    res: ServerResponse<IncomingMessage>
  ) {
    console.log("Message was created: ", req.params.id)
    emitEvent(req.params.id, (await HTTPReader.parseBody(req)))
    res.statusCode = 200
  }
  public async deleteMessage(
    req: Request,
    res: ServerResponse<IncomingMessage>
  ) {

  }
}
