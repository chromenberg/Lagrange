import { Logger, LogLevel } from "../../core/logging/Logger.js";
import type { ResultSet } from "../../core/types/Types.js";
import { Atlas } from "../AtlasManager.js";
import type { PoolItemPair } from "./pooling/Pool.js";
import { PoolResourceNotSentError } from "./pooling/PoolErrors.js";
import { AtlasService } from "./client/AtlasChild.js";
import { UserService } from "./services/UserService.js";
import { ChannelService } from "./services/ChannelService.js";
import { GuildService } from "./services/GuildService.js";
import { MessageService } from "./services/MessageService.js";
import { AuthService } from "./services/AuthService.js";
import { RelationshipService } from "./services/RelationshipService.js";
import { UserBulkService } from "./services/UserBulkDataService.js";

/**
 * A Request builder that auto returns and provides abstracted methods for creating requests.
 *
 * This operates on the ATLAS NoSQL Database system
 */
export class RequestBuilder extends AtlasService {
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
          LogLevel.Error,
          ["ATLAS", "AtlasClient", "Requests"],
          "No resource was returned during the construction of a RequestBuilder",
        );
        throw new PoolResourceNotSentError(
          "No pooling resource was sent during the construction of a RequestBuilder",
        );
      }
      this.connection = resource;
    }
  }

  public async request(...args: any[]): ResultSet {
    // send the connection to atlas so no extra connection is used
    return this.parent.client.execute(this.connection, args.join(" ") + ";");
  }

  public async filteringRequest(...args: any[]): ResultSet {
    return this.request(args, "ALLOW FILTERING");
  }

  public return(): void {
    this.parent.client.returnResource(this.connection);
    this.returned = true;
  }

  [Symbol.dispose]() {
    if (!this.returned) {
      Logger.sendLog(
        LogLevel.Critical,
        ["ATLAS", "AtlasClient", "RequestBuilder"],
        "SAFEGUARD: The connection was not returned before going out of scope",
        "this will create unusable pool connections.",
        "\n",
        "SAFEGUARD: Automatically returning connection to prevent leaks.",
      );

      this.return();
    }
  }
}

// TODO: Move this into another file
export function toAtlasBase(data: string): string {
  return btoa(data).replaceAll("=", "");
}
/**
 * Gets the number of seconds since 1970
 * @returns seconds since epoch
 */
export function getSeconds(): number {
  return Math.trunc(Date.now() / 1000);
}
/**
 * Creates a date suitable for using within a token
 * @returns token suitable data
 */
export function hexDate(): string {
  const time = Buffer.alloc(4); // alloc 4 bytes to a buffer
  time.writeInt32BE(getSeconds()); // then write time in int32be

  return time.toString("base64url");
}

/**
 * Provides a single point where all the database services can be accessed
 */
export class RequestManager {
  private readonly _users: UserService;
  private readonly _messages: MessageService;
  private readonly _guilds: GuildService;
  private readonly _channels: ChannelService;
  private readonly _auth: AuthService;
  private readonly _relationships: RelationshipService;
  private readonly _bulkuser: UserBulkService;
  constructor(private parent: Atlas) {
    this._users = new UserService(this.parent);
    this._messages = new MessageService(this.parent);
    this._guilds = new GuildService(this.parent);
    this._channels = new ChannelService(this.parent);
    this._auth = new AuthService(this.parent);
    this._relationships = new RelationshipService(this.parent)
    this._bulkuser = new UserBulkService(this.parent)
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
  public get auth(): AuthService {
    return this._auth;
  }
  public get relationships(): RelationshipService {
    return this._relationships
  }
  public get bulkuser(): UserBulkService {
    return this._bulkuser
  }
}
