import type { Snowflake } from "../../../core/types/Types.js";
import type { PubSub } from "../../../core/pubsub/PubSub.js";
import { Collection } from "../../../core/structs/Collection.js";
import { pubSub } from "./PubSubHandler.js";

export class BaseChannel {
  protected readonly _id: Snowflake;
  protected readonly _broker: PubSub<any>;
  constructor(id: Snowflake, broker: PubSub<any>) {
    this._id = id;
    this._broker = broker;
  }

  public emitEvent(data: any): this {
    this._broker.publish(this._id, data);
    return this;
  }

  public get id(): Snowflake {
    return this._id;
  }
}

/**
 * All events involving guild actions are spawned here. This contains a guilds channels and their events too.
 *
 */
export class BaseGuild extends BaseChannel {
  protected _channels: Collection<Snowflake, BaseChannel> =
    new Collection();
  constructor(id: Snowflake, broker: PubSub<any>) {
    super(id, broker);
  }
  public getChannel(id: Snowflake): BaseChannel | undefined {
    return this._channels.get(id);
  }
  public channelIDs(): Snowflake[] {
    return this._channels.keysArr();
  }
  public channelsArr(): [Snowflake, BaseChannel][] {
    return this._channels.toArray();
  }
  public get channels(): Collection<Snowflake, BaseChannel> {
    return this._channels;
  }
}
