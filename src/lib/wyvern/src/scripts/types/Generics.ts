export type SelfUser<T> = T & { email: string }
export type NamedWithID<T> = T & { name: string; id: string };
export type NG_NamedWithID = { name: string; id: string };
export type Nullable<T> = {
  [PropertyKey in keyof T]: T[PropertyKey] | null
}
export type WithGuild<T> = {
  guild: {
    id: string
    name: string
  }
} & T
export type Null<T> = T | null