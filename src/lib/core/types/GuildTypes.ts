import type { Snowflake } from "./Types.js"

export type UnavailableID = {
  id: Snowflake
  unavailable: boolean
}