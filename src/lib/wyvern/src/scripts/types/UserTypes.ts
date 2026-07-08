import type { Null } from "./Generics";
import type { Role } from "./RoleTypes";

export interface User {
  /**
   * Users avatar hash
   */
  avatar: Null<string>;

  /**
   * Hash of user banner
   */
  banner?: Null<string>

  system?: boolean
  
  /**
   * Users username
   */
  username: string;

  /**
   * Is the user a bot user?
   */
  bot?: boolean;

  /**
   * The users custom discriminator
   *
   * This is NOT "0" if {@link User.bot} is true
   */
  discriminator: string | "0";

  /**
   * What is the users display name
   *
   * Used for legacy accounts that do not have a username
   */
  display_name: string;

  /**
   * The ACTUAL display name of the user
   */
  globalName: string;

  /**
   * Users id
   */
  id: string;
}

export interface ClientUser extends User {
  

  /**
   * User profile bio
   */
  bio: string
  
  /**
   * Email that the client registered under
   */
  email: string

  /**
   * Has the client used the mobile client before
   */
  mobile: boolean

  /**
   * Has the client used the desktop client before
   */
  desktop: boolean

  /**
   * Clients phone number
   */
  phone: Null<string>
  
  
}


/**
 * Data of a user specific to a guild, contains overrides such as per guild avatars, banners or names
 */
export interface Member {
  /**
   * Users server avatar hash
   */
  avatar: Null<string>;

  /**
   * Users server banner hash
   */
  banner: Null<string>;

  /**
   * Time until user is not timed out
   */
  communication_disabled_until: Null<Date>;

  /**
   * Is the user server deafened?
   */
  deaf: boolean;

  /**
   * Is the user server muted?
   */
  mute: boolean;

  /**
   * Users server nickname
   */
  nick: Null<string>;

  /**
   * Unknown, Pending application accept?
   */
  pending: boolean;

  /**
   * Roles the user has in the server
   */
  roles: Role[];

  joined_at: Date;

  /**
   * Global data of user
   */
  user: User;
}
