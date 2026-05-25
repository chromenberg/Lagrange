import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import type { ATLAS } from "../../../../common/Typings.js";
import { Atlas } from "../../AtlasManager.js";
import type { PoolItemPair } from "../pooling/Pool.js";
import { PoolResourceNotSentError } from "../pooling/PoolErrors.js";
import { AtlasChild } from "./AtlasChild.js";
import { UserService } from "./UserService.js";
import { ChannelService } from "./ChannelService.js";
import { GuildService } from "./GuildService.js";
import { MessageService } from "./MessageService.js";


/**
 * A Request builder that auto returns and provides abstracted methods for creating requests.
 * 
 * This operates on the ATLAS NoSQL Database system
 */
export class RequestBuilder extends AtlasChild {
  private connection: PoolItemPair;
  private returned: boolean = false;
  constructor(parent: Atlas, connection?: PoolItemPair) {
    super(parent);

    if (connection) {
      this.connection = connection;
    } else {
      // request for a connection from the database
      const resource = this.parent.client.requestResource();

      if (!resource) {
        Logger.sendLog(
          LogLevel.Error, ["ATLAS", "AtlasClient", "Requests"],
          "No resource was returned during the construction of a RequestBuilder"
        );
        throw new PoolResourceNotSentError("No pooling resource was sent during the construction of a RequestBuilder");
      }
      this.connection = resource;
    }
  }

  public async request(...args: any[]): ATLAS.ResultSet {
    // send the connection to atlas so no extra connection is used
    return this.parent.client.execute(this.connection, args.join(" ") + ";");
  }

  
  public async filteringRequest(...args: any[]): ATLAS.ResultSet {
    return this.request(args, "ALLOW FILTERING");
  }

  public return(): void {
    this.parent.client.returnResource(this.connection);
    this.returned = true;
  }

  [Symbol.dispose]() {
    if (!this.returned) {
      Logger.sendLog(
        LogLevel.Critical, ["ATLAS", "AtlasClient", "RequestBuilder"],
        "SAFEGUARD: The connection was not returned before going out of scope",
        "this will create unusable pool connections.",
        "\n",
        "SAFEGUARD: Automatically returning connection to prevent leaks."
      );

      this.return();
    }
  }
}

// TODO: Move this into another file
export function toAtlasBase(data: string): string {
  return btoa(data).replaceAll("=", "");
}
export function hexDate(): string {
  return Date.now().toString(16);
}

export class RequestManager {
  private readonly _users: UserService;
  private readonly _messages: MessageService;
  private readonly _guilds: GuildService;
  private readonly _channels: ChannelService;
  constructor(
    private parent: Atlas
  ) {
    
    this._users = new UserService(this.parent);
    this._messages = new MessageService(this.parent);
    this._guilds = new GuildService(this.parent);
    this._channels = new ChannelService(this.parent);
  }

  public get users(): UserService {
    return this._users;
  }
  public get guilds(): GuildService {
    return this._guilds;
  }
  public get channels(): ChannelService {
    return this._channels;
  }
  public get messages(): MessageService {
    return this._messages;
  }
}
