import type { API, VoidAPICallback, VoidRouteCallback } from "../../../core/types/Types.js";
import { Router } from "./Router.js";

export abstract class RouteBase {
  public abstract delete(path: string, callback: VoidAPICallback): void;
  public abstract delete(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;

  public abstract get(path: string, callback: VoidAPICallback): void;
  public abstract get(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;

  public abstract post(path: string, callback: VoidAPICallback): void;
  public abstract post(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;

  public abstract put(path: string, callback: VoidAPICallback): void;
  public abstract put(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;

  public abstract patch(path: string, callback: VoidAPICallback): void;
  public abstract patch(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void;
}

export class Route implements RouteBase { //? can this be the base that Router extends from and adds a server?
  private routeMap: Map<string, Route> = new Map();
  constructor(
    private readonly route: string,
    private readonly router: Router | Route
  ) {}

  public get path(): string {
    return this.route;
  }
  
  protected sanitisePath(path: string): string {
    if (!path.startsWith("/")) return this.route + path;
    return this.route + path.replace("/", "");
  }
  
  protected conditionalMethodOverload(
    path: string,
    method: API.HTTPMethod,
    args: [VoidAPICallback, VoidAPICallback?]
  ): void {
    if (this.router instanceof Router) {
      this.router.selectMethodOverload(path, method, args);
    } else {
      // eventually this should be able to search infinitely
      if (this.router.router instanceof Route) return;
      this.router.router.selectMethodOverload(path, method, args);
    }
  }
  public delete(path: string, callback: VoidAPICallback): void
  public delete(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void
  public delete(path: string, ...args: [VoidAPICallback, VoidAPICallback?]): void {
    this.conditionalMethodOverload(this.sanitisePath(path), "DELETE", args);
  }

  public get(path: string, callback: VoidAPICallback): void
  public get(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void
  public get(path: string, ...args: [VoidAPICallback, VoidAPICallback?]): void {
    this.conditionalMethodOverload(this.sanitisePath(path), "GET", args);
  }

  public post(path: string, callback: VoidAPICallback): void
  public post(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void
  public post(path: string, ...args: [VoidAPICallback, VoidAPICallback?]): void {
    this.conditionalMethodOverload(this.sanitisePath(path), "POST", args);
  }


  public put(path: string, callback: VoidAPICallback): void
  public put(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void
  public put(path: string, ...args: [VoidAPICallback, VoidAPICallback?]): void {
    this.conditionalMethodOverload(this.sanitisePath(path), "PUT", args);
  }

  public patch(path: string, callback: VoidAPICallback): void
  public patch(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void
  public patch(path: string, ...args: [VoidAPICallback, VoidAPICallback?]): void {
    this.conditionalMethodOverload(this.sanitisePath(path), "PATCH", args);
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
  public subroute(route: string, callback: VoidRouteCallback): this {
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
}

