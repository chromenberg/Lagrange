import type { IncomingMessage, ServerResponse } from "http";
import type { Route } from "../modules/rest/router/Route.js";
import type { Request } from "../modules/rest/router/Router.js";
import { Logger, LogLevel } from "../../../../../Common/Logging/dist/Logger.js";

interface ServiceList {
  DMService: DMMessageService
}

export class DMMessageService {
  constructor() { }
}


export class MessageService {
  private readonly route: Route;
  private readonly services: ServiceList;
  constructor(
    route: Route,
    // services: ServiceList
  ) {
    this.route = route;
    // this.services = services;
    // -----------------------
    this.route.post(
      "/channels/:id/messages",
      this.createMessage
    );
    this.route.patch(
      "/channels/:id/messages/:mid",
      this.editMessage
    );
    this.route.delete(
      "/channels/:id/message/:mid",
      this.deleteMessage
    );
  }

  public async editMessage(
    req: Request,
    res: ServerResponse<IncomingMessage>
  ) {
    Logger.sendLog(LogLevel.Verbose, ["LAGRANGE", "MessageService"],
      "recieved a request to edit a message")
  }
  public async createMessage(
    req: Request,
    res: ServerResponse<IncomingMessage>
  ) {
    Logger.sendLog(LogLevel.Verbose, ["LAGRANGE", "MessageService"],
      "recieved a request to create a message")
  }
  public async deleteMessage(
    req: Request,
    res: ServerResponse<IncomingMessage>
  ) {
    Logger.sendLog(LogLevel.Verbose, ["LAGRANGE", "MessageService"],
      "recieved a request to delete a message")
  }
}
