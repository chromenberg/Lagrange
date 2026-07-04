import type { IncomingMessage, ServerResponse } from "http";
import type { Request } from "../../lagrange/modules/rest/Router.js";
import type { Route } from "../../lagrange/modules/rest/Route.js";
import type { types } from "cassandra-driver";
import { type SQLOutputValue } from "node:sqlite";

export type Correct<T> = unknown & T;

export namespace API {
  export interface RequestParams {
    [key: string]: any;
  }
  export type APICallback<Type> = (
    req: Request,
    res: ServerResponse<IncomingMessage>,
  ) => Type;
  export type HTTPMethod =
    | "PUT"
    | "POST"
    | "PATCH"
    | "GET"
    | "DELETE"
    | "OPTIONS";
  export type MIMEType =
    | "application/x-abiword"
    | "image/apng"
    | "application/x-freearc"
    | "image/avif"
    | "video/x-msvideo"
    | "application/octet-stream"
    | "image/bmp"
    | "application/x-bzip"
    | "application/x-bzip2"
    | "application/x-cdf"
    | "application/x-csh"
    | "text/css"
    | "text/csv"
    | "application/gzip"
    | "application/x-gzip"
    | "image/gif"
    | "text/html"
    | "text/calendar"
    | "application/java-archive"
    | "image/jpeg"
    | "text/javascript"
    | "application/json"
    | "application/ld+json"
    | "text/markdown"
    | "audio/midi"
    | "text/javascript"
    | "audio/mpeg"
    | "video/mp4"
    | "video/mpeg"
    | "audio/ogg"
    | "video/ogg"
    | "application/ogg"
    | "audio/ogg"
    | "font/otf"
    | "image/png"
    | "application/pdf"
    | "application/x-sh"
    | "image/svg+xml"
    | "application/x-tar"
    | "image/tiff"
    | "video/mp2t"
    | "font/ttf"
    | "text/plain"
    | "audio/wav"
    | "audio/webm"
    | "video/webm"
    | "application/manifest+json"
    | "image/webp"
    | "font/woff"
    | "font/woff2"
    | "application/xhtml+xml"
    | "application/xml"
    | "application/zip"
    | "application/x-zip-compressed"
    | "application/x-7z-compressed";

  export type Response = ServerResponse<IncomingMessage>;
}

export type ObjKeys = string | number | symbol;

export type Callback<Type> = (...args: any[]) => Type;
export type VoidCallback = Callback<void>;
export type VoidAPICallback = API.APICallback<void>;
export type VoidRouteCallback = (route: Route) => void;
export type VoidCallbackEventMap<EventMap> = <K extends keyof EventMap>(
  data: EventMap[K],
) => void;
export type IterCallback = (value: any, index: number, array: any[]) => void;

export type AsyncCallback<Type> = Callback<Promise<Type>>;
export type AsyncVoidCallback = AsyncCallback<void>;
export type OneOrArr<T> = T | T[];

/**
 * Overrides the deprecated NonSharedBuffer in NodeJS,
 */
export type NonSharedBuffer = Buffer<ArrayBuffer>;

export type SQLResponse = Record<string, SQLOutputValue>;
export type SQLPromise = Promise<SQLResponse | undefined>;
export type SQLPromiseArray = Promise<SQLResponse[] | undefined>;
export type SQLPromiseIterator = Promise<NodeJS.Iterator<SQLResponse>>;

export type ResultSet = Promise<types.ResultSet>;
export type Snowflake = string;
export type Null<T> = T | null;

export type EmailAddress = `${string}@${string}.${string}`;
export type Token = `${Snowflake}.${string}.${string}`;
export type WeakObj = {
  [key: string]: any
}
export interface BaseUser {
  id: Snowflake;
  username: string;
  display_name: string;
}

export interface User extends BaseUser {
  email?: string
}

export interface UserCreds {
  email: EmailAddress;
  password: string;
}

export interface UserSignupData extends UserCreds {
  username: string;
}

export interface SignupResponse {
  user_id: Snowflake;
  token: Token;
}
export type IDIndexedItem = {
  id: Snowflake;
  name: string;
};
export namespace Templates {
  export namespace roles {
    export const everyone = {
      id: "0",
      name: "@everyone",
      permissions: "2248329584430657", // This is a bitfield, Need to make a bitfield data type
      color: 0,
      hoist: false,
      mentionable: false,
    };
  }
}
