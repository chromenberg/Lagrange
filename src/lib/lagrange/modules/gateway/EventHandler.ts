import { Atlas } from "../../../../_Init.js";
import { AtlasEvents } from "../../../atlas/AtlasEvents.js";

import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import { EventHandler } from "../../../core/structs/EventHandler.js";
import type {
  Snowflake,
  VoidCallback,
  WeakObj,
} from "../../../core/types/Types.js";

const loc = ["LAGRANGE", "Gateway", "Events"];

export class EventSystem extends EventHandler {
  constructor() {
    super();
    Atlas.on(AtlasEvents.guildCreate, (guildID, ownerID) => {
      // recieves the newly created guild and its id alongside the owner of the guild
      // as the owner will always be the first member and joins alongside the guild
      Logger.sendLog(
        LogLevel.Verbose,
        loc,
        "syncing guilds [reason: guildCreate]",
      );
    });
    Atlas.on(AtlasEvents.guildRemove, (guildID, ownerID) => {
      Logger.sendLog(
        LogLevel.Verbose,
        loc,
        "syncing guilds [reason: guildRemove]",
      );
    });
    Atlas.on(AtlasEvents.channelCreate, (guildID, channelID) => {
      Logger.sendLog(
        LogLevel.Verbose,
        loc,
        "syncing channels [reason: channelCreate]",
      );
    });
    Atlas.on(AtlasEvents.channelRemove, (guildID, channelID) => {
      Logger.sendLog(
        LogLevel.Verbose,
        loc,
        "syncing channels [reason: channelRemove]",
      );
    });
  }

  public channelSub(
    event: string,
    guildID: Snowflake,
    channelID: Snowflake,
    listener: VoidCallback,
  ) {
    this.on([event, guildID, channelID].join("-"), listener);
  }
  public guildSub(event: string, guildID: Snowflake, listener: VoidCallback) {
    this.on([event, guildID].join("-"), listener);
  }

  public _cSub(
    guildID: Snowflake,
    channelID: Snowflake,
    listener: VoidCallback,
  ) {
    this.channelSub("", guildID, channelID, listener);
  }
  public _gSub(guildID: Snowflake, listener: VoidCallback) {
    this.guildSub("", guildID, listener);
  }

  public _offGSub(guildID: Snowflake, listener: VoidCallback) {
    this.off(guildID, listener);
  }

  public emitGuild(guildID: Snowflake, data: WeakObj) {
    this.emit(guildID, data);
  }
  public emitChannel(guildID: Snowflake, channelID: Snowflake, data: WeakObj) {
    this.emit([guildID, channelID].join("-"), data);
  }
  public emitChannelEvent(
    event: string,
    guildID: Snowflake,
    channelID: Snowflake,
    data: WeakObj,
  ) {
    this.emit([event, guildID, channelID].join("-"), data);
  }
  public emitGuildEvent(event: string, guildID: Snowflake, data: WeakObj) {
    this.emit([event, guildID].join("-"), data);
  }
}
