export type SelfUser<T> = T & { email: string }
export type NamedWithID<T> = T & { name: string; id: string };
export type WithGuild<T> = {
  guild: {
    id: string
    name: string
  }
} & T
