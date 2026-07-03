import type { NamedWithID } from "./Generics";

export type ChannelType = "Text" | "Voice" | "Announcements" | "DirectMessage"

export type Channel = NamedWithID<{
  index: number;
}>;