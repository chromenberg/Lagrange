import { Server } from "http";
import { Config } from "../Config.js";
import { LogLevels, SerLogger } from "../Logging.js";

const HTTPServer = new Server().listen(Config.REST.Port, Config.REST.Address);
/*
Each file is a specific part of the api, it dictates a folder basically
the request gets passed on down to each file and checks the current request path before consuming it and routing to the right module

this is probably really bad when it comes to stack hammering but who cares, it can be reimplemented later down the road
i say this because i need to call functions within functions and then get their responses which will most likely also include promises
so then there will be a massive amount of calls and returns
*/

function sendMessage(guildID: bigint, channelID: bigint, data: string) {
 
}

const routes = {
  api: {
    v1: {
      guilds: {
        replacer: ":guildID",
        param: {
          channels: {
            replacer: ":channelID",
            param: {
              messages: {
                type: {
                  POST: sendMessage,
                  GET: {

                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
let i = 0;
HTTPServer.on("request", (req) => {
    SerLogger.log(LogLevels.Verbose, "[REST -> Routing] Got a request for",req.url);
    if (req.url?.startsWith("/api/v1/message/")) {
      const a = BigInt(2);
      routes.api.v1.guilds.param.channels.param.messages.type.POST(BigInt(1), BigInt(1), "'hi! this is an automated test whenever a request is sent'")
      i++;
    }
})