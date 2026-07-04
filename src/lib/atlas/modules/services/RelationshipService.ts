import type { Snowflake } from "../../../core/types/Types.js";
import { RelationshipType } from "../../../core/types/UserTypes.js";
import type { Atlas } from "../../AtlasManager.js";
import { AtlasService } from "../client/AtlasChild.js";
import { parseToken } from "./TokenParser.js";

// FIXME: ANY OF THESE REQUESTS CAN BE SPOOFED TO HAVE ANOTHER ID INSIDE THE TOKEN
export class RelationshipService extends AtlasService {
  constructor(parent: Atlas) {
    super(parent);
  }

  private _getUserRelationsWithType(token: string, type: RelationshipType) {
    const id = parseToken(token)
    return this.sql.all`SELECT * FROM relationships WHERE user_id1 = ${BigInt(id)} AND relation_type = ${type};`
  }
  
  /**
   * Gets all relationships belonging to a user
   * @param token
   * @returns
   */
  public getAllUserRelationships(token: string) {
    const id = parseToken(token)
    // user_id1 is always the client the relationship belongs to
    // user_id2 is the relation that id has to the user
    return this.sql
      .all`SELECT * FROM relationships WHERE user_id1 = ${BigInt(id)};`;
  }

  /**
   * Gets the relationship between 2 users if there is any
   * @param id
   * @param other_id
   * @returns
   */
  public commonRelationBetweenUsers(token: string, other_id: Snowflake) {
    const id = parseToken(token)
    return this.sql.get`SELECT * FROM relationships
      WHERE user_id1 = ${BigInt(id)} AND user_id2 = ${BigInt(other_id)};`;
  }

  /**
   * Gets all friends of a user
   * @param token 
   * @returns 
   */
  public getUserFriends(token: string) {
    return this._getUserRelationsWithType(token, RelationshipType.Friend);
  }

  /**
   * Gets all relations for a user that are marked as implicit
   * @param token 
   * @returns 
   */
  public getUserImplicits(token: string) {
    return this._getUserRelationsWithType(token, RelationshipType.Implicit);
  }
  
  /**
   * Gets all pending friend requests the user has received
   * @param token 
   * @returns 
   */
  public getUserIncomingRequests(token: string) {
    return this._getUserRelationsWithType(token, RelationshipType.Incoming);
  }

  /**
   * Gets all friend requests the user has sent out
   * @param token 
   * @returns 
   */
  public getUserOutgoingRequests(token: string) {
    return this._getUserRelationsWithType(token, RelationshipType.Outgoing);
  }

  public getUserFriendsAndRequests(token: string) {
    const id = parseToken(token)
    return this.sql.all`SELECT * FROM relationships 
      WHERE user_id1 = ${BigInt(id)} 
      AND relation_type = ${RelationshipType.Friend} 
      OR relation_type = ${RelationshipType.Incoming} 
      OR relation_type = ${RelationshipType.Outgoing};`
  }

  public getUserFriendsWithInfo(token: string) {
    const id = parseToken(token)
    return this.sql.all`SELECT * FROM relationships LEFT JOIN users ON relationships.user_id2 = users.user_id WHERE relationships.user_id1 = ${BigInt(id)};`
  }
}
