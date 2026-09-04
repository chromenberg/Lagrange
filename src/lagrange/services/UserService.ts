import type { IncomingMessage, ServerResponse } from "http";
import type { Route } from "../modules/rest/Route.js";
import type { Request } from "../modules/rest/Router.js";
import { CDNService, upload } from "./CDNService.js";
import { HTTPReader } from "../modules/rest/HTTPReader.js";
import { Atlas } from "../../_Init.js";
import {
  APIErrorCodes,
  IErrorEnum,
  InternalErrors,
} from "../../core/errors/ServerErrors.js";
import type { API, WeakObj } from "../../core/types/Types.js";
import { GenToken } from "../../atlas/modules/crypt/Crypt.js";

export class UserService {
  private readonly route: Route;
  constructor(route: Route) {
    this.route = route;
    // FIXME: This conflicts with /channels/@me
    route.post("/@me/profile/avatar", (req, res) => {
      this.uploadAvatar(req, res);
    });
  }

  public async getCurrentUser(
    req: Request,
    res: ServerResponse<IncomingMessage>,
  ) {}

  public async uploadAvatar(
    req: Request,
    res: ServerResponse<IncomingMessage>,
  ) {
    console.log("Avatar uploading");

    const body = await HTTPReader.getBody(req);
    if (!req.headers.authorization || !req.headers["content-type"]) {
      res.setHeader("Content-Type", "application/json");
      res.write(APIErrorCodes.INVALID_HEADERS);
      res.end();
      return;
    }
    Atlas.requests.users
      .getUserByToken(req.headers.authorization)
      .then(async (user) => {
        console.log("uploading");
        console.log(body, req.headers["content-type"]);
        const hash = await upload(
          body,
          req.headers["content-type"] as API.MIMEType,
          user?.["user_id"] as string,
        );
        console.log("updating", user?.["user_id"]);

        Atlas.requests.users.updateUserAvatar(
          user?.["user_id"] as string,
          hash,
        );
      })
      .catch(() => {});
  }
}
