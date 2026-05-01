import type { IncomingMessage, ServerResponse } from "http";

export namespace API {
    interface RequestParams {
      [key: string]: any
    }

    type APICallback = (req: Request, res: ServerResponse<IncomingMessage>) => void;
    
    // We extend the IncomingMessage class to add a property
    // for storing url parameters
    type Request = IncomingMessage {
      private _params: RequestParams = {};
      
      public get params(): RequestParams {
        return this._params
      }
      
      public set params(data: any) {
        this._params = data
      }
    }
    
    type HTTPMethod = "PUT" | "POST" | "PATCH" | "GET" | "DELETE" | "OPTIONS";
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
                    "application/zip"       | "application/x-zip-compressed" | "application/x-7z-compressed";
}

export namespace Functions {
    export type Callback<Type> = (...args: any[]) => Type;
    export type VoidCallback = Callback<void>;
    export type APICallback


    export type AsyncCallback<Type> = Callback<Promise<Type>>;
    export type AsyncVoidCallback = AsyncCallback<void>;
    export type AsyncAPICallback =
}