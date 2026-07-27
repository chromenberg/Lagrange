import { Atlas } from "../../../../_Init.js";
import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import { PubSub } from "../../../core/pubsub/PubSub.js";
import { Collection } from "../../../core/structs/Collection.js";
import type { KeyOfEvents } from "../../../core/types/GatewayTypes.js";
import type { Snowflake, VoidCallback } from "../../../core/types/Types.js";
import { Registry } from "../../registries/LagrangeRegistry.js";
import { GatewayEventTypes } from "../events/GatewayEvents.js";

type GatewayPubSub = PubSub<typeof GatewayEventTypes>;

type PubType = {
  publisher: GatewayPubSub;
  channels: Collection<string, GatewayPubSub>;
};
/*
Currently the layout we have follows this structure

A guild has its own publisher stored within an object which also includes its channels.
Each channel has its own emitter too

This means we need to modify that object when a new channel is created or guild is made

Instead what we can do is create a publisher for every GUILD instead,
Which means the format would go as follows

<guild_emitter>.on("eventname")
OR
<guild_emitter>.on("channel_id-eventname")

Meaning subscribing to new channel events is as simple as subscribing to that channel id
And when a new guild is made, all the server has to do is create a new emitter.

This is most likely a subpar way of doing this, and could be further optimised by following a format of
GuildID-EventName | GuildID-ChannelID-EventName

Meaning only one emitter is needed, however for now this would work without too much refactoring
with the current publisher system

Actually nevermind im stupid, because youre subscribing to all events of a guild and its channels
Meaning it doesnt actually matter. Maybe I should have done that instead of this crappy hack
To get it to work, which means refactoring this into modules will be impossible
*/
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
      channels: new Collection(
        // Returns a map of [channelID, pubsub][] to convert into a collection
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
    Logger.sendLog(
      LogLevel.Info,
      ["LAGRANGE", "Gateway", "EventManager"],
      "Waiting for init signal from ATLAS",
    );

    process.on("atlasInit", () => {
      Logger.sendLog(
        LogLevel.Info,
        ["LAGRANGE", "Gateway", "EventManager"],
        "ATLAS init signal found, populating Gateway Publisher",
      );
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
          ["LAGRANGE", "Registry", "inverseChannelMap"],
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

  /**
   * Subscribes to all events of the specified name from a guild
   * @param eventName
   * @param id
   * @param listener
   */
  public guildSubscribe(
    eventName: KeyOfEvents,
    id: Snowflake,
    listener: VoidCallback,
  ) {
    // Log
    Logger.sendLog(
      LogLevel.Verbose,
      ["LAGRANGE", "Gateway", "GuildPublisher"],
      "Subscribed to [" + eventName + "] in guild [" + id + "]",
    );

    this.getGuild(id)?.subscribe(eventName, listener);
  }

  /**
   * Subscribes to every event from a guild
   * @param id
   * @param listener
   * @returns
   */
  public wildcardGuildSubscribe(
    id: Snowflake,
    listener: VoidCallback,
  ): symbol[] | undefined {
    Logger.sendLog(
      LogLevel.Verbose,
      ["LAGRANGE", "Gateway", "GuildPublisher"],
      "New wildcard subscription in guild " + id,
    );
    return this.getGuild(id)?.wildcardSubscribe(listener);
  }

  /**
   * Subscribes to all events of a name from a specified channel
   * @param eventName
   * @param guildID
   * @param channelID
   * @param listener
   * @returns
   */
  public channelSubscribe(
    eventName: KeyOfEvents,
    guildID: Snowflake,
    channelID: Snowflake,
    listener: VoidCallback,
  ): symbol | undefined {
    Logger.sendLog(
      LogLevel.Verbose,
      ["LAGRANGE", "Gateway", "GuildPublisher"],
      `Subscribed to [${eventName}] ` + `in guild [${guildID}] [#${channelID}]`,
    );
    return this.getChannel(guildID, channelID)?.subscribe(eventName, listener);
  }

  public wildcardChannelSubscribe(
    guildID: Snowflake,
    channelID: Snowflake,
    listener: VoidCallback,
  ): symbol[] | undefined {
    return this.getChannel(guildID, channelID)?.wildcardSubscribe(listener);
  }
}
// console.log(await Atlas.requests.guilds.getAllGuildChannels());
