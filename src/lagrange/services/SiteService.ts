import { readFile } from "fs";
import { Collection } from "../../core/structs/Collection.js";
import type { Route } from "../modules/rest/Route.js";
import type { API, NonSharedBuffer } from "../../core/types/Types.js";
import type { Request } from "../modules/rest/Router.js";
type SiteCache = Collection<string, NonSharedBuffer>;

/**
 * Service for managing calls to get resources for the client.
 * 
 * Should be mapped to a CDN later on
 */
export class SiteService {
  private _cache: SiteCache
  constructor(
    private route: Route,
    private _path: string,
    cache?: SiteCache
  ) {
    this._cache = cache ? cache : new Collection();
    this.route.get("*", (req, res) => { this.handleRequest(req, res) })
  }
  
  public get path(): string {
    return this._path;
  }
  
  public handleRequest(req: Request, res: API.Response): void {

    if (!req.url) return;
    const file = req.url?.replace(this.route.path, "")

    this.getFile(req, res, file)
  }
  
  private setMimeType(res: API.Response, type: API.MIMEType): API.Response {
    return res.setHeader("Content-Type", type)
  }
  
  public sendFile(res: API.Response, data: NonSharedBuffer, fileName: string) {
    // TODO: fix this horrible shit now
    if (fileName.endsWith(".js")) {
      this.setMimeType(res, "text/javascript")
    } else if (fileName.endsWith(".css")) {
      this.setMimeType(res, "text/css")
    } else if (fileName.endsWith(".json")) {
      this.setMimeType(res, "application/json")
    } else if (fileName.endsWith(".html")) {
      this.setMimeType(res, "text/html")
    } else if (fileName.endsWith(".svg")) {
      this.setMimeType(res, "image/svg+xml")
    } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
      this.setMimeType(res, "image/jpeg")
    } else if (fileName.endsWith(".png")) {
      this.setMimeType(res, "image/png")
    }
    
    res.write(data)
    res.end()
  }
    
  public getFile(req: Request, res: API.Response, path: string) {
    if (path.startsWith("/")) { path = path.replace("/", "") }
    //? Users might be able to read any file by inserting ../
    return readFile(this._path + path, (err, data) => {
      if (err) return

      this.sendFile(res, data, path)
    })
  }
}
