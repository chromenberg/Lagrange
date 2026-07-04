import type { WithGuild } from "./Generics";

export type ChannelCreateEvent = WithGuild<{
  id: string
  name: string
  type?: string
}>