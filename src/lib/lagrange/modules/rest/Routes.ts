import { Auth, UserData } from "../../services/UserService.js";
import { API } from "./REST.js";

export default function init() {

  API.route("/api/v1/users/", (route) => {
    // temporary until i make a middleware for this
    route.get("/@me/profile/set-username/:param", async (req, res) => {
      UserData.Usernames.CheckAvailability(req.params.param).then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(result));
        res.end();
      })
    });
    route.get("/signup/:username/:email/:pass", async (req, res) => {
      Auth.SignUp(
        req.params.username,
        req.params.email,
        req.params.pass
      ).then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(result));
        res.end();
      })
    });
  });
  console.log(API.listeners("request"))
};
