import type { IncomingMessage, ServerResponse } from "http";
import type { Route } from "../modules/rest/Route.js";
import S3mini from "s3mini";
import type { Request } from "../modules/rest/Router.js";
import { HTTPReader } from "../modules/rest/HTTPReader.js";
import { GenToken } from "../../atlas/modules/crypt/Crypt.js";
import { Config } from "../Config.js";
import type { API, Snowflake } from "../../core/types/Types.js";
import type { StringRecord } from "../../core/types/AliasTypes.js";
import { SnowflakeNode } from "../../atlas/modules/snowflake/Snowflake.js";
import { Atlas } from "../../_Init.js";
import { writeFileSync } from "fs";
export const CDN = new S3mini({
  accessKeyId: Config.CDN.AccessKey,
  secretAccessKey: Config.CDN.SecretKey,
  endpoint: Config.CDN.Path,
  region: "auto",
});
export class CDNService {
  private readonly route: Route;
  private readonly s3: S3mini = CDN;
  constructor(route: Route) {
    this.route = route;

    this.route.put("/", (req, res) => {
      this.uploadFile(req, res);
    });
    this.route.get("/", (req, res) => {
      this._getFile(req, res);
    });
    this.route.get("/presign/put/:name", (req, res) => {
      res.setHeader("Content-Type", "text/plain");
      res.write(
        this.newPresignPut(
          req.params.name,
          (req.headers["content-type"] as API.MIMEType) ??
            "application/octet-stream",
        ),
      );
      res.end();
    });
  }

  public async uploadFile(
    req: Request,
    res: ServerResponse<IncomingMessage>,
  ): Promise<Response> {
    console.log("Uploading file");
    return new Promise((response) => {
      HTTPReader.getBody(req).then(async (body) => {
        const result = await this.s3.putObject(
          "icons/142409349984174080/" + GenToken(16).ToBase64Atlas() + ".jpg",
          body,
          req.headers["content-type"],
        );
        res.setHeader("Content-Type", "text/plain");
        res.write(await result.text());
        res.end();
      });
    });
  }

  public async newPresignPut(key: string, type: API.MIMEType): Promise<string> {
    return this.s3.getPresignedUrl(
      "PUT", // Method
      key, // Filename
      Config.REST.S3.ExpireIn, // Expiry time
      {}, // Query Params
      {
        "Content-Type": type,
      },
    );
  }

  public async newPresignGet(
    key: string,
    params: StringRecord,
  ): Promise<string> {
    return this.s3.getPresignedUrl(
      "GET", // Method
      key, // Filename
      Config.REST.S3.ExpireIn, // Expiry time
      params, // Query Params
    );
  }

  private _getFile(req: Request, res: ServerResponse<IncomingMessage>) {
    this.getFile(req.params.name).then((file) => {
      res.setHeader("Content-Type", req.headers["content-type"] ?? "");
      res.write(file);
      res.end();
    });
  }
  public getFile(key: string): Promise<string | null> {
    return this.s3.getObject(key);
  }
}

export async function upload(
  data:   Buffer<ArrayBufferLike>,
  contentType: API.MIMEType,
  userID: Snowflake,
): Promise<string> {
    const hash = btoa(Atlas.requests.users.newUserID());
  return new Promise((response) => {
    console.log("Uploaing", data.toString());
    writeFileSync("./shit.png", data)
    CDN.putObject(
      "avatars/" + userID + "/" + hash + "",
      data,
      contentType,
    ).then(() => {
      console.log("Uploaded");
      response(hash);
    });
  });
}
