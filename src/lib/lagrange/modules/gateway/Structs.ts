import type { ATLAS } from "../../../../common/Typings.js";
import type { PubSub } from "../../../core/pubsub/PubSub.js";
import { Collection } from "../../../core/structs/Collection.js";
import { pubSub } from "./PubSubHandler.js";

export class BaseChannel {
  protected readonly _id: ATLAS.Snowflake;
  protected readonly _broker: PubSub<any>;
  constructor(id: ATLAS.Snowflake, broker: PubSub<any>) {
    this._id = id;
    this._broker = broker;
  }

  public emitEvent(data: any): this {
    this._broker.publish(this._id, data);
    return this;
  }

  public get id(): ATLAS.Snowflake {
    return this._id;
  }
}

/**
 * All events involving guild actions are spawned here. This contains a guilds channels and their events too.
 *
 */
export class BaseGuild extends BaseChannel {
  protected _channels: Collection<ATLAS.Snowflake, BaseChannel> =
    new Collection();
  constructor(id: ATLAS.Snowflake, broker: PubSub<any>) {
    super(id, broker);
  }
  public getChannel(id: ATLAS.Snowflake): BaseChannel | undefined {
    return this._channels.get(id);
  }
  public channelIDs(): ATLAS.Snowflake[] {
    return this._channels.keysArr();
  }
  public channelsArr(): [ATLAS.Snowflake, BaseChannel][] {
    return this._channels.toArray();
  }
  public get channels(): Collection<ATLAS.Snowflake, BaseChannel> {
    return this._channels;
  }
}
