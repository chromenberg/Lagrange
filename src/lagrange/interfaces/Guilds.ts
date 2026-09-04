export interface GuildRole {
  id: number // id being the index
  name: string
  permissions: string
  color: number
  hoist: boolean
  mentionable: boolean
}
export interface GuildChannel {
  
}
export interface GuildCreateObj {
  name: string
  description?: string
}