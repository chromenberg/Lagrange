import { Atlas } from "../../../_Init.js";
import { AtlasEvents } from "../../../atlas/AtlasEvents.js";

import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import { EventHandler } from "../../../core/structs/EventHandler.js";
import type {
  Snowflake,
  VoidCallback,
  WeakObj,
} from "../../../core/types/Types.js";
import { Registry } from "../../registries/LagrangeRegistry.js";

const loc = ["LAGRANGE", "Gateway", "Registry"];

export class EventSystem extends EventHandler {
  constructor() {
    super();
  }

  public userSub(userId: Snowflake, listener: VoidCallback) {
    this.on(userId, listener);
  }


  public channelSub(
    guildID: Snowflake,
    channelID: Snowflake,
    listener: VoidCallback,
  ) {
    this.on([guildID, channelID].join("-"), listener);
  }

  public guildSub(guildID: Snowflake, listener: VoidCallback) {
    this.on(guildID, listener);
  }

  public emitUser(userId: Snowflake, eventName: string, data: WeakObj) {
    this.emit(userId, eventName, data);
  }
  public emitGuild(guildID: Snowflake, eventName: string, data: WeakObj) {
    this.emit(guildID, eventName, data);
  }
  public emitChannel(
    guildID: Snowflake,
    channelID: Snowflake,
    eventName: string,
    data: WeakObj,
  ) {
    this.emit([guildID, channelID].join("-"), eventName, data);
  }
}

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
    });
    Logger.sendLog(LogLevel.Verbose, loc, Registry.fetch("inverseChannelMap"));
    Atlas.prepend(AtlasEvents.guildCreate, (ownerID, guildID) => {
      // recieves the newly created guild and its id alongside the owner of the guild
      // as the owner will always be the first member and joins alongside the guild
      Logger.sendLog(
        LogLevel.Verbose,
        loc,
        "syncing guilds [reason: guildCreate]",
      );
    });
    Atlas.prepend(AtlasEvents.guildRemove, (ownerID, guildID) => {
      Logger.sendLog(
        LogLevel.Verbose,
        loc,
        "syncing guilds [reason: guildRemove]",
      );
      Registry.fetch("inverseChannelMap")?.forEach((value, key) => {
        if (value === guildID) Registry.fetch("inverseChannelMap")?.delete(key);
      });
    });
    Atlas.prepend(AtlasEvents.channelCreate, (ownerID, guildID, channelID) => {
      Logger.sendLog(
        LogLevel.Verbose,
        loc,
        "syncing channels [reason: channelCreate]",
      );
      Registry.fetch("inverseChannelMap")?.set(channelID, guildID);
      Logger.sendLog(
        LogLevel.Verbose,
        loc,
        Registry.fetch("inverseChannelMap"),
      );
    });
    Atlas.prepend(AtlasEvents.channelRemove, (ownerID, guildID, channelID) => {
      Logger.sendLog(
        LogLevel.Verbose,
        loc,
        "syncing channels [reason: channelRemove]",
      );
      Registry.fetch("inverseChannelMap")?.delete(channelID);
    });
  });
});
