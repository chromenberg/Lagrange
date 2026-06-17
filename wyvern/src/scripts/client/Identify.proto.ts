type IdentProperties = {
  os: string
  browser: string
  device: string
}
type ActivityTypes = {
  Playing: 0
  Streaming: 1
  Watching: 2
  Listening: 3
}
type StatusType = "dnd" | "invisible" | "idle" | "online"
type ShardIndex = [number, number]
type Activity = {
  name: string
  type: ActivityTypes
}

type IdentPresence = {
  activities: Activity[]
  status: StatusType
  since?: number
  afk: boolean
}

type IdentData = {
  token: string
  properties?: IdentProperties
  presence?: IdentPresence
  intents: string,
  shard?: ShardIndex
}
function ident(data: Partial<IdentData>): Partial<IdentData> {
  return {
    token: data.token,
    properties: data.properties,
    presence: data.presence,
    intents: data.intents,
    
  }
}
export function IdentifyProtoBuilder(data: IdentData) {
  return JSON.stringify({ opCode: 2, data: ident(data) })
}