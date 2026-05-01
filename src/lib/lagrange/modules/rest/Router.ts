import { IncomingMessage, createServer, ServerResponse, Server, OutgoingMessage } from "http";
import { Logger, LogLevel } from "../../../../../../Common/Logging/dist/Logger.js";

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
type Callback = (...args: any[]) => any;
type HTTPMethod = "PUT" | "POST" | "PATCH" | "GET" | "DELETE" | "OPTIONS";
// giant type for autocomplete, doesnt contain all mime types but contains most that everyone uses
type MIMEType = "application/x-abiword" | "image/apng"                   | "application/x-freearc"       | "image/avif"         |
                "video/x-msvideo"       | "application/octet-stream"     | "image/bmp"                   | "application/x-bzip" |
                "application/x-bzip2"   | "application/x-cdf"            | "application/x-csh"           | "text/css"           |
                "text/csv"              | "application/gzip"             | "application/x-gzip"          | "image/gif"          |
                "text/html"             | "text/calendar"                | "application/java-archive"    | "image/jpeg"         |
                "text/javascript"       | "application/json"             | "application/ld+json"         | "text/markdown"      |
                "audio/midi"            | "text/javascript"              | "audio/mpeg"                  | "video/mp4"          |
                "video/mpeg"            | "audio/ogg"                    | "video/ogg"                   | "application/ogg"    |
                "audio/ogg"             | "font/otf"                     | "image/png"                   | "application/pdf"    |
                "application/x-sh"      | "image/svg+xml"                | "application/x-tar"           | "image/tiff"         |
                "video/mp2t"            | "font/ttf"                     | "text/plain"                  | "audio/wav"          |
                "audio/webm"            | "video/webm"                   | "application/manifest+json"   | "image/webp"         |
                "font/woff"             | "font/woff2"                   | "application/xhtml+xml"       | "application/xml"    |
                "application/zip"       | "application/x-zip-compressed" | "application/x-7z-compressed" ;


class Router extends Server {
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

  private callbackWrapper(
    path: string,
    mode: HTTPMethod,
    callback: APICallback,
    callback2?: APICallback & Callback
  ): void {
    const regexp = Router.parseParams(path);

    this.on("request", (req: Request, res) => {
      if (req.method !== mode) return;

      const params = req.url?.match(regexp);
  
      if (!params || (params === null)) return;
      if (!params.groups) return;

      req.params = params.groups;

      // if theres a 2nd callback function then we will run that first and then call the callback within that
      if (callback2) {
        callback2(req, res, callback);
      }
      callback(req, res)
    })
  }
  // overloads
  
  
  public delete(path: string, callback  : APICallback): void;
  public delete(path: string, middleware: APICallback, callback: APICallback): void;

  public delete(
    path: string,
    ...args: [APICallback, APICallback?]
  ): void {
    if (args.length === 1) { 
      this.callbackWrapper(path, "DELETE", args[0]);

    } else if (args.length === 2 && args[1]) {
     this.callbackWrapper(path, "DELETE", args[0], args[1]);

    } else {
      Logger.sendLog(LogLevel.Warning, ["LAGRANGE", "REST", "Router", "DELETE: "+path], "More than 2 or less than 1 callbacks provided");
    }
  }
  

  public get(path: string, callback  : APICallback): void;
  public get(path: string, middleware: APICallback, callback: APICallback): void;

  public get(
    path: string,
    ...args: [APICallback, APICallback?]
  ): void {
    if (args.length === 1) { 
      this.callbackWrapper(path, "GET", args[0]);

    } else if (args.length === 2 && args[1]) {
     this.callbackWrapper(path, "GET", args[0], args[1]);

    } else {
      Logger.sendLog(LogLevel.Warning, ["LAGRANGE", "REST", "Router", "GET: "+path], "More than 2 or less than 1 callbacks provided");
    }
  }
  
  
  public post(path: string, callback  : APICallback): void;
  public post(path: string, middleware: APICallback, callback: APICallback): void;

  public post(
    path: string,
    ...args: [APICallback, APICallback?]
  ): void {
    if (args.length === 1) { 
      this.callbackWrapper(path, "POST", args[0]);

    } else if (args.length === 2 && args[1]) {
     this.callbackWrapper(path, "POST", args[0], args[1]);

    } else {
      Logger.sendLog(LogLevel.Warning, ["LAGRANGE", "REST", "Router", "POST: "+path], "More than 2 or less than 1 callbacks provided");
    }
  }
  

  public put(path: string, callback  : APICallback): void;
  public put(path: string, middleware: APICallback, callback: APICallback): void;
    
  public put(
    path: string,
    ...args: [APICallback, APICallback?]
  ): void {
    if (args.length === 1) { 
      this.callbackWrapper(path, "PUT", args[0]);

    } else if (args.length === 2 && args[1]) {
     this.callbackWrapper(path, "PUT", args[0], args[1]);

    } else {
      Logger.sendLog(LogLevel.Warning, ["LAGRANGE", "REST", "Router", "PUT: "+path], "More than 2 or less than 1 callbacks provided");
    }
  }
  
  
  public patch(path: string, callback  : APICallback): void;
  public patch(path: string, middleware: APICallback, callback: APICallback): void;
  
  public patch(
    path: string,
    ...args: [APICallback, APICallback?]
  ): void {
    if (args.length === 1) { 
      this.callbackWrapper(path, "PATCH", args[0]);

    } else if (args.length === 2 && args[1]) {
      this.callbackWrapper(path, "PATCH", args[0], args[1]);

    } else {
      Logger.sendLog(LogLevel.Warning, ["LAGRANGE", "REST", "Router", "PATCH: "+path], "More than 2 or less than 1 callbacks provided");
    }
  }

}


/**
 * router.("/api/v1/users/1/profile", middlewareFunction, callback)
 * 
 * router runs middleware and the output of that is used inside the callback
 */
