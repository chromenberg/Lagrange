import { MessageService } from "../../services/MessageService.js";
import { UserService } from "../../services/UserService.js";
import { AuthService } from "../../services/AuthService.js";
import { API } from "./REST.js";

export default function init() {
  API.get("/", (req, res) => {
    res.setHeader("content-type", "text/html")
    res.write("<html><body>hi</body></html>")
    res.end()
  })
  
  API.route(
    "/api/v1/channels/",
    route => new MessageService(route)
  )
  API.route(
    "/api/v1/users/",
    route => new UserService(route)
  )
  API.route(
    "/api/v1/auth/",
    route => new AuthService(route)
  )
};
