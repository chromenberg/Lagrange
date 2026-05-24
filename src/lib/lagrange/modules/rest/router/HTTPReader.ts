import type { Request } from "./Router.js";

// TODO: Rewrite the default HTTP requests to use this shit
export class HTTPReader {
  constructor() {
    
  }

  static parseBody(request: Request) {
    return new Promise((res) => {
      const body: Uint8Array[] = [];
      
      request.on("data", (data) => {
        body.push(data);
      });
  
      request.on("end", () => {
        res(JSON.parse(Buffer.concat(body).toString()));
      })
    })
  }
}