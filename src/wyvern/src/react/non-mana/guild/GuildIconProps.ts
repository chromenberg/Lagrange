import type { Null } from "../../../scripts/types/Generics";

export interface GuildIconProps {
  guildInfo: {
    id: string;
    name: string;
    icon: Null<string>;
    firstChannel: string;
  };
}
