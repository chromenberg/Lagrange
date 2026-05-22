import type { IncomingMessage, ServerResponse } from "http";
import type { Route } from "../modules/rest/router/Route.js";
import type { Request } from "../modules/rest/router/Router.js";

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
      "/channels/:id/messages",
      (req, res) => { this.createMessage(req, res) }
    );
    this.route.patch(
      "/channels/:id/messages/:mid",
      (req, res) => { this.editMessage(req, res) }
    );
    this.route.delete(
      "/channels/:id/message/:mid",
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
    
  }
  public async deleteMessage(
    req: Request,
    res: ServerResponse<IncomingMessage>
  ) {

  }
}
