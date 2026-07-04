import type { Snowflake } from "../../../core/types/Types.js";
import { RelationshipType } from "../../../core/types/UserTypes.js";
import type { Atlas } from "../../AtlasManager.js";
import { AtlasService } from "../client/AtlasChild.js";

export class RelationshipService extends AtlasService {
  constructor(parent: Atlas) {
    super(parent);
  }

  private _getUserRelationsWithType(id: Snowflake, type: RelationshipType) {
    return this.sql.all`SELECT * FROM relationships WHERE user_id1 = ${id} AND relation_type = ${type};`
  }
  
  /**
   * Gets all relationships belonging to a user
   * @param id
   * @returns
   */
  public getAllUserRelationships(id: Snowflake) {
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
  public commonRelationBetweenUsers(id: Snowflake, other_id: Snowflake) {
    return this.sql.get`SELECT * FROM relationships
      WHERE user_id1 = ${id} AND user_id2 = ${other_id};`;
  }

  /**
   * Gets all friends of a user
   * @param id 
   * @returns 
   */
  public getUserFriends(id: Snowflake) {
    return this._getUserRelationsWithType(id, RelationshipType.Friend);
  }

  /**
   * Gets all relations for a user that are marked as implicit
   * @param id 
   * @returns 
   */
  public getUserImplicits(id: Snowflake) {
    return this._getUserRelationsWithType(id, RelationshipType.Implicit);
  }
  
  /**
   * Gets all pending friend requests the user has received
   * @param id 
   * @returns 
   */
  public getUserIncomingRequests(id: Snowflake) {
    return this._getUserRelationsWithType(id, RelationshipType.Incoming);
  }

  /**
   * Gets all friend requests the user has sent out
   * @param id 
   * @returns 
   */
  public getUserOutgoingRequests(id: Snowflake) {
    return this._getUserRelationsWithType(id, RelationshipType.Outgoing);
  }
}
