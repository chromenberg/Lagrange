import type { Null } from "./Generics";

export interface Role {
  color: string;
  colors: {
    primary_color: string;
    secondary_color: Null<string>;
    tertiary_color: Null<string>;
  };
  flags: number;
  hoist: boolean;
  icon: string;
  id: string;
  managed: boolean;
  name: string;
  permissions: string;
  position: number;
}
