import type { Channel } from "./ChannelTypes.js";
import type { Null, Snowflake } from "./Types.js";
import type { Member } from "./UserTypes.js";

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
  id: Snowflake;
  managed: boolean;
  name: string;
  permissions: string;
  position: number;
}

export interface Emoji {
  animated: boolean;
  available: boolean;
  id: Snowflake;
  managed: boolean;
  name: string;
  require_colons: boolean;
  roles: undefined;
}

interface GuildProperties {
  /**
   * Hash of guild banner
   */
  banner: Null<string>;
  /**
   * Guild Description
   */
  description: Null<string>;
  /**
   * Hash for guild icon
   */
  icon: Null<string>;
  /**
   * Guild name
   */
  name: string;
  /**
   * ID of the user that owns the guild
   */
  owner_id: Snowflake;
  /**
   * Custom invite URL of the guild
   */
  vanity_url_code: Null<string>;
}

export interface Guild {
  channels: Channel[]; // Array of channels the guild has
  emojis: Emoji[]; // Array of emojis the guild has
  id: Snowflake; // Guild ID
  joined_at: Date; // When did the user join
  large: boolean; // Is the guild large enough to hide offline members
  lazy: boolean; // ???
  member_count: number;
  members: Member[]; // An array only containing your user
  properties: GuildProperties;
  roles: Role[];
}
