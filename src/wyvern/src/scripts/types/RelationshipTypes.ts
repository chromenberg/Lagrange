/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Null } from "./Generics";

// @ts-ignore
export enum RelationshipType {
  None,
  Friend,
  Blocked,
  Incoming,
  Outgoing,
  Implicit,
}

export interface UserRelationship {
  /**
   * Identical to the User ID
   */
  id: string;

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

  user_id: string;

  /**
   * Is the user ignored by the client,
   */
  user_ignored: boolean;

  /**
   * Personalized note written alongside the friend request
   */
  note?: string;
}
