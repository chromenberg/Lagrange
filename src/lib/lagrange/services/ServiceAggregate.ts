import type { AuthService } from "./AuthService.js"
import type { GatewayService } from "./GatewayService.js"
import type { GuildService } from "./GuildService.js"
import type { MessageService } from "./MessageService.js"
import type { SiteService } from "./SiteService.js"
import type { UserService } from "./UserService.js"

type Services = {
  messages: MessageService,
  guilds: GuildService,
  users: UserService,
  auth: AuthService,
  gateway: GatewayService,
  site: SiteService
}

export class ServiceManager {
  private readonly _services: Services;
  
  constructor(services: Services) {
    this._services = services
  }

  public get auth(): AuthService {
    return this._services.auth
  }

  public get site(): SiteService {
    return this._services.site
  }

  public get gateway(): GatewayService {
    return this._services.gateway
  }

  public get users(): UserService {
    return this._services.users
  }

  public get guild(): GuildService {
    return this._services.guilds
  }

  public get messages(): MessageService {
    return this._services.messages
  }
}