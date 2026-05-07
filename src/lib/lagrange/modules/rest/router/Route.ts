import type { VoidAPICallback } from "../../../../../common/Typings.js";
import type { Router } from "./Router.js";

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
  constructor(
    private readonly route: string,
    private readonly router: Router
  ) {}

  protected sanitisePath(path: string): string {
    if (!path.startsWith("/")) return this.route + path;
    return this.route + path.replace("/", "");
  }

  public delete(path: string, callback: VoidAPICallback): void
  public delete(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void
  public delete(path: string, ...args: [VoidAPICallback, VoidAPICallback?]): void {
    this.router.selectMethodOverload(this.sanitisePath(path), "DELETE", args);
  }

  public get(path: string, callback: VoidAPICallback): void
  public get(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void
  public get(path: string, ...args: [VoidAPICallback, VoidAPICallback?]): void {
    this.router.selectMethodOverload(this.sanitisePath(path), "GET", args);
  }

  public post(path: string, callback: VoidAPICallback): void
  public post(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void
  public post(path: string, ...args: [VoidAPICallback, VoidAPICallback?]): void {
    this.router.selectMethodOverload(this.sanitisePath(path), "POST", args);
  }


  public put(path: string, callback: VoidAPICallback): void
  public put(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void
  public put(path: string, ...args: [VoidAPICallback, VoidAPICallback?]): void {
    this.router.selectMethodOverload(this.sanitisePath(path), "PUT", args);
  }

  public patch(path: string, callback: VoidAPICallback): void
  public patch(path: string, middleware: VoidAPICallback, callback: VoidAPICallback): void
  public patch(path: string, ...args: [VoidAPICallback, VoidAPICallback?]): void {
    this.router.selectMethodOverload(this.sanitisePath(path), "PATCH", args);
  }
}

