import { IncomingMessage, createServer, ServerResponse, Server } from "http";
import { Logger, LogLevel } from "../../../../../../Common/Logging/dist/Logger.js";
//import { AtlasSocket, messageAtlas } from "../../atlas/AtlasInterface.js";

interface RequestParams {
  [key: string]: any
}
// We extend the IncomingMessage class to add a property
// for storing url parameters
class Request extends IncomingMessage {
  private _params: RequestParams = {};

  public get params(): RequestParams {
    return this._params
  }

  public set params(data: any) {
    this._params = data
  }
}


type APICallback = (req: Request,
                    res: ServerResponse<IncomingMessage>) => void;

class API extends Server {
  constructor() {
    super({ // set incoming message to be request instead
      IncomingMessage: Request
    });
  }

  /**
   * Parses the url parameters of a path and returns the regex string of it
   * @param path 
   * @returns 
   */
  public static parseParams(path: string): string {
    return path
      .replace(/[\s!#$()+,.:<=?[\\\]^{|}]/g, '\\$&')
      .replace(/\/\\:(\w+)\\\?/g, '(?:/(?<$1>(?<=/)[^/]+))?')
      .replace(/\/\\:(\w+)/g, '/(?<$1>[^/]+)');
  }

  public get(
    path: string,
    callback: APICallback
  ): void {
    const regexp = API.parseParams(path);

    this.on("request", (req: Request, res) => {
      // get the parameters within the url
      const params = req.url?.match(regexp);

      if (!params || (params === null)) return;
      if (!params.groups) return;
    
      req.params = params.groups;

      callback(req, res);
    })
  }
}

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