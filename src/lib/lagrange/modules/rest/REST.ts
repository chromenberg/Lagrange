import { IncomingMessage, createServer, ServerResponse, Server } from "http";
import { Logger, LogLevel } from "../../../../../../Common/Logging/dist/Logger.js";
//import { AtlasSocket, messageAtlas } from "../../atlas/AtlasInterface.js";


const api = new API()
api.listen(80)



api.get("/api/v1/users/:user_id/profile", async (req, res) => {
  Logger.sendLog(LogLevel.Info, ["LAGRANGE", "REST", "Routing"], "Received a request for "+req.url+" | Params: ",JSON.stringify(req.params,null,"  "));
  let d = {};

  await new Promise((resolve) => {
    Logger.sendLog(LogLevel.Info, ["LAGRANGE", "REST", "Routing"], "Requesting data from ATLAS");
    // messageAtlas({
    //   type: 0,
    //   data: req.params
    // }, (msg) => {d = JSON.parse(msg); resolve(msg)})
  })

  Logger.sendLog(LogLevel.Info, ["LAGRANGE", "REST", "Routing"], "Response received from ATLAS");
  
  res.setHeader("Content-Type", "application/json")
  res.write(JSON.stringify(
    {
      path: req.url,
      params: req.params,
      response: d
    }
  ))
  res.end()

  Logger.sendLog(LogLevel.Success, ["LAGRANGE", "REST", "Routing"], "ATLAS Response:"+JSON.stringify(
    {
      path: req.url,
      params: req.params,
      response: d
    }
  ,null, "  "))
})