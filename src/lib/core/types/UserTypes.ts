import type { Role } from "./GuildTypes.js";
import type { Null, Snowflake } from "./Types.js";

export enum RelationshipType {
  None,
  Friend,
  Blocked,
  Incoming,
  Outgoing,
}




export interface UserRelationship {
  /**
   * Identical to the User ID
   */
  id: Snowflake;

  // is_spam_request: boolean
  nickname: Null<string>;

  /**
   * When was this user added as a friend
   */
  since: Date;

  /**
   * How is this user related to the client
   *
   * Friend - The user is a friend of the client
   *
   * Blocked - The user is blocked by the client
   *
   * Spam - The user is flagged as spam for the client
   */
  type: RelationshipType;

  user_id: Snowflake;

  /**
   * Is the user ignored by the client,
   */
  user_ignored: boolean;

  /**
   * Personalized note written alongside the friend request
   */
  note?: string
}

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
  id: Snowflake;
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
