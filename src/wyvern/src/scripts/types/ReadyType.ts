import type { Guild } from "./GuildTypes"
import type { UserRelationship } from "./RelationshipTypes"
import type { ClientUser } from "./UserTypes"

export type UnavailableGuild = {
  id: string,
  unavailable: boolean
}

export type ReadyEvent = {
  relations: UserRelationship[]
  user: ClientUser
  guilds: Guild[]
}