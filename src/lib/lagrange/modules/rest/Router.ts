import { IncomingMessage, createServer, ServerResponse, Server, OutgoingMessage } from "http";
import { Logger, LogLevel } from "../../../../../../Common/Logging/dist/Logger.js";
import type { API, VoidAPICallback, VoidCallback} from "../../../../common/Typings.js";

interface RequestParams {
  [key: string]: any
}
// We extend the IncomingMessage class to add a property
// for storing url parameters
export class Request extends IncomingMessage {
  private _params: RequestParams = {};
  
  public get params(): RequestParams {
    return this._params
  }
  
  public set params(data: any) {
    this._params = data
  }
}

export class Router {
  private readonly server: Server;
  constructor() {
    this.server = new Server({ // set incoming message to be request instead
      IncomingMessage: Request
    });
  }

  /**
   * Parses the url parameters of a path and returns the regex string of it
   * @param path 
   * @returns 
   */
  public static parseParams(path: string): string { //? This seems to be the reason paramaterless requests break
    console.log(path)
    return path
      .replace(/[\s!#$()+,.:<=?[\\\]^{|}]/g, '\\$&')
      .replace(/\/\\:(\w+)\\\?/g, '(?:/(?<$1>(?<=/)[^/]+))?')
      .replace(/\/\\:(\w+)/g, '/(?<$1>[^/]+)');
  }

  protected callbackWrapper(
    path: string,
    mode: API.HTTPMethod,
    callback: VoidAPICallback,
    callback2?: VoidAPICallback & VoidCallback
  ): void {
    const regexp = Router.parseParams(path);

    this.server.on("request", (req: Request, res) => {
      if (req.method !== mode) return;

      const params = req.url?.match(regexp);

      if (!params || (params === null)) return;
      //if (!params.groups) return; //! this causes the problems

      req.params = params.groups;
      console.log(callback, callback2, params.groups)
      // if theres a 2nd callback function then we will run that first and then call the callback within that
      //! For some reason this is true when groups arent checked
      if (callback2) {
        callback2(req, res, callback);
        return;
      }
      callback(req, res)
    })
  }
  
  protected selectOverload(
    path: string,
    mode: API.HTTPMethod,
    args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    if (args.length === 1) { 
      this.callbackWrapper(path, mode, args[0]);

    } else if (args.length === 2 && args[1]) {
     this.callbackWrapper(path, mode, args[0], args[1]);

    } else {
      Logger.sendLog(LogLevel.Warning, ["LAGRANGE", "REST", "Router",`${mode}: ${path}`], "More than 2 or less than 1 callbacks provided");
    }
  }
  
  public delete(path: string, callback  : VoidAPICallback): void;
  public delete(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;
  public delete(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectOverload(path, "DELETE", args);
  }
  

  public get(path: string, callback  : VoidAPICallback): void;
  public get(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;

  public get(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectOverload(path, "GET", args);
  }
  
  
  public post(path: string, callback  : VoidAPICallback): void;
  public post(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;

  public post(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectOverload(path, "POST", args);
  }
  

  public put(path: string, callback  : VoidAPICallback): void;
  public put(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;
    
  public put(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectOverload(path, "PUT", args);
  }
  
  
  public patch(path: string, callback  : VoidAPICallback): void;
  public patch(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;
  
  public patch(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectOverload(path, "PATCH", args);
  }

  public listeners(eventName: string): VoidCallback[] {
    return this.server.listeners(eventName)
  }

  public listen(address: string, port: number): this {
    this.server.listen(port, address);
    return this;
  }

  public getRaw(path: string, callback: VoidAPICallback): void {
    this.server.on("request", (req: Request, res) => {
      if (req.url === path) {
        callback(req, res);
      }
    })
  }
  
}


/**
 * router.("/api/v1/users/1/profile", middlewareFunction, callback)
 * 
 * router runs middleware and the output of that is used inside the callback
 */
export class LagrangeAPI extends Router {
  constructor() {
    super();
  }
  //protected intercept(req, res, callback)
  public delete(path: string, callback  : VoidAPICallback): void;
  public delete(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;
  public delete(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectOverload(path, "DELETE", args);
  }
  

  public get(path: string, callback  : VoidAPICallback): void;
  public get(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;

  public get(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectOverload(path, "GET", args);
  }
  
  
  public post(path: string, callback  : VoidAPICallback): void;
  public post(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;

  public post(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectOverload(path, "POST", args);
  }
  

  public put(path: string, callback  : VoidAPICallback): void;
  public put(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;
    
  public put(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectOverload(path, "PUT", args);
  }
  
  
  public patch(path: string, callback  : VoidAPICallback): void;
  public patch(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;
  
  public patch(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectOverload(path, "PATCH", args);
  }
  
}