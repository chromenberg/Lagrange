import type { ChannelType } from "./ChannelTypes"

export type LocationStore = {
  guild: {
    id: string
    name: string
  }
  channel: {
    id: string | null
    name: string | null
    type: ChannelType | null
  }
} 

