export type GuildMemberUpdateData = {
  user: {
    id: string
    username: string
    display_name: string | null
  }
  guild: {
    id: string
    name: string
  }
}