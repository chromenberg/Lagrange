import { IncomingMessage, createServer, ServerResponse, Server, OutgoingMessage } from "http";
import { Logger, LogLevel } from "../../../../../../../Common/Logging/dist/Logger.js";
import type { API, VoidAPICallback, VoidCallback, VoidRouteCallback} from "../../../../../common/Typings.js";
import { Route, RouteBase } from "./Route.js";

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

export class Router implements RouteBase {
  private readonly routeMap = new Map<string, Route>()
  private readonly server: Server;
  constructor(
    server?: Server
  ) {
    if (!server) {
      this.server = new Server({ // set incoming message to be request instead
        IncomingMessage: Request
      });
    } else {
      this.server = server;
    }
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

  // wraps the choice making code that determines whether there is a middleware present
  protected callbackWrapperFinal(
    req: Request,
    res: ServerResponse<IncomingMessage>,
    callback: VoidAPICallback,
    callback2?: VoidAPICallback & VoidCallback
  ): void {
    if (callback2) {
      callback2(req, res, callback);
      return;
    }
    callback(req, res);
    return;
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

      // temporary fix to api parameters causing the normal api to regress
      if (!path.includes("/:") && path === req.url) {
        this.callbackWrapperFinal(req, res, callback, callback2);
        return;
      }

      const params = req.url?.match(regexp);
      if (!params || (params === null)) return;
      if (!params.groups) return;
      
      req.params = params.groups;
      this.callbackWrapperFinal(req, res, callback, callback2);
      return;
    })
  }
  
  public selectMethodOverload(
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
    this.selectMethodOverload(path, "DELETE", args);
  }
  

  public get(path: string, callback  : VoidAPICallback): void;
  public get(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;

  public get(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectMethodOverload(path, "GET", args);
  }
  
  
  public post(path: string, callback  : VoidAPICallback): void;
  public post(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;

  public post(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectMethodOverload(path, "POST", args);
  }
  

  public put(path: string, callback  : VoidAPICallback): void;
  public put(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;
  public put(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectMethodOverload(path, "PUT", args);
  }
  
  
  public patch(path: string, callback  : VoidAPICallback): void;
  public patch(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;
  
  public patch(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectMethodOverload(path, "PATCH", args);
  }

  /**
   * This generates an endpoint that is called when the start matches a certain value.
   * For example a route could be `/api/v1/` and therefore all calls that are a part of `/api/v1/` would go through this route.
   * 
   * This also shifts the relative path of {@link get}, {@link post}, {@link patch}, {@link put} and {@link delete} to the routes path.
   * This means that calls for `/users/@me` would be, in full `/api/v1/users/@me`
   * @param route 
   * @param callback - the callback function to use, requires a route parameter to use the functions
   * @returns 
   */
  public route(route: string, callback: VoidRouteCallback): this {
    {
      const routeObj = this.routeMap.get(route);
      if (routeObj) {
        console.log("route already exists, using stored route")
        callback(routeObj);
        return this;
      }
    }
    const routeObj = new Route(route, this);
    this.routeMap.set(route, routeObj);

    callback(routeObj);
    return this;
  }

  public listeners(eventName: string): VoidCallback[] {
    return this.server.listeners(eventName)
  }

  public listen(address: string, port: number): this {
    this.server.listen(port, address);
    return this;
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
    this.selectMethodOverload(path, "DELETE", args);
  }
  

  public get(path: string, callback  : VoidAPICallback): void;
  public get(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;

  public get(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectMethodOverload(path, "GET", args);
  }
  
  
  public post(path: string, callback  : VoidAPICallback): void;
  public post(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;

  public post(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectMethodOverload(path, "POST", args);
  }
  

  public put(path: string, callback  : VoidAPICallback): void;
  public put(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;
    
  public put(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectMethodOverload(path, "PUT", args);
  }
  
  
  public patch(path: string, callback  : VoidAPICallback): void;
  public patch(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;
  
  public patch(
    path: string,
    ...args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    this.selectMethodOverload(path, "PATCH", args);
  }
  
}