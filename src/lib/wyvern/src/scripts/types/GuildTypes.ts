export type GuildChannel = {
  guild_id: string
  channel_id: string
}

import type { Channel } from "./ChannelTypes.js";
import type { Null } from "./Generics.js";
import type { Role } from "./RoleTypes.js";
import type { Member } from "./UserTypes.js";

export interface Emoji {
  animated: boolean;
  available: boolean;
  id: string;
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
  owner_id: string;
  /**
   * Custom invite URL of the guild
   */
  vanity_url_code: Null<string>;
}

export interface Guild {
  channels: Channel[]; // Array of channels the guild has
  emojis: Emoji[]; // Array of emojis the guild has
  id: string; // Guild ID
  joined_at: Date; // When did the user join
  large: boolean; // Is the guild large enough to hide offline members
  lazy: boolean; // ???
  member_count: number;
  members: Member[]; // An array only containing your user
  properties: GuildProperties;
  roles: Role[];
}
