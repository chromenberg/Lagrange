import { Atlas } from "../../../../_Init.js";
import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import { PubSub } from "../../../core/pubsub/PubSub.js";
import { Collection } from "../../../core/structs/Collection.js";
import type { Snowflake, VoidCallback } from "../../../core/types/Types.js";
import { Registry } from "../../registries/LagrangeRegistry.js";
import { GatewayEventTypes } from "../events/GatewayEvents.js";

type GatewayPubSub = PubSub<typeof GatewayEventTypes>;

type PubType = {
  publisher: GatewayPubSub;
  channels: Collection<string, GatewayPubSub>;
};

class GuildPublisher {
  private _channels: Snowflake[];
  private _id: Snowflake;
  private _publisher: GatewayPubSub;
  constructor(id: Snowflake, channels: Snowflake[]) {
    this._channels = channels;
    this._id = id;
    this._publisher = new PubSub();
  }

  public get publisher(): GatewayPubSub {
    return this._publisher;
  }

  public get channels(): Snowflake[] {
    return this._channels;
  }

  public get id(): Snowflake {
    return this._id;
  }

  /**
   * Converts the stored guild and channel info into an object containing publishers
   * @returns
   */
  public json() {
    return {
      publisher: this._publisher,
      channels: new Collection( // Returns a map of [channelID, pubsub][] to convert into a collection
        this._channels.map((channel) => {
          // map the channels to have their own publishers
          return [channel, new PubSub<typeof GatewayEventTypes>()];
        }),
      ),
    };
  }
}
export class GatewayPublisher {
  private _guilds: Collection<string, PubType>;
  constructor() {
    this._guilds = new Collection();
    const accumulator: Record<string, any> = {};

    process.on("atlasInit", () => {
      Atlas.requests.guilds.getAllGuildChannels().then((res) => {
        res?.forEach((pair) => {
          // convert the guild id into a string as we cant serialize bigints
          const idString = pair.guild_id?.toString();
          const channelID = pair.channel_id?.toString();
          if (!idString || !channelID) return; // check if string is undefined

          Registry.fetch("inverseChannelMap")?.set(channelID, idString);

          if (Object.hasOwn(accumulator, idString)) {
            // if the guild ID exists then add the channel in
            accumulator[idString].push(channelID);
          } else {
            accumulator[idString] = [channelID];
          }
        });
        Object.entries(accumulator).forEach(([key, value]) => {
          this.addGuildPublisher(new GuildPublisher(key, value));
        });

        // console.log(this._guilds.entries());
        Logger.sendLog(
          LogLevel.Verbose,
          ["LAGRANGE", "Registry"],
          "Data in inverseChannelMap",
          Registry.fetch("inverseChannelMap"),
        );
      });
    });
  }

  /**
   * Adds a guild into the publisher registry, contains publishers for each channel inside the guild
   * @param publisher
   */
  public addGuildPublisher(publisher: GuildPublisher) {
    this._guilds.set(publisher.id, publisher.json());
  }

  public addChannel(guildID: Snowflake, channelID: Snowflake) {}

  public getGuild(guildID: Snowflake): GatewayPubSub | undefined {
    return this._guilds.get(guildID)?.publisher;
  }

  public getChannel(
    guildID: Snowflake,
    channelID: Snowflake,
  ): GatewayPubSub | undefined {
    return this._guilds.get(guildID)?.channels.get(channelID);
  }

  public subscribeArr(ids: Snowflake[], listeners: VoidCallback[]) {}
  public guildSubscribe(id: Snowflake, listener: VoidCallback) {
    this.getGuild(id)?.subscribe("CHANNEL_CREATE", listener);
  }
  public channelSubscribe(
    guildID: Snowflake,
    channelID: Snowflake,
    listener: VoidCallback,
  ) {
    this.getChannel(guildID, channelID)?.subscribe("MESSAGE_CREATE", listener);
  }
}
// console.log(await Atlas.requests.guilds.getAllGuildChannels());
