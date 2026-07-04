import type { SelfUser } from "./Generics"
import type { UserData } from "./UserType"

export type UnavailableGuild = {
  id: string,
  unavailable: boolean
}

export type ReadyEvent = {
  user: SelfUser<UserData>
  guilds: UnavailableGuild[]
}