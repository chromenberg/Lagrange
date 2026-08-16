import { Atlas } from "../../../../_Init.js";
import { AtlasEvents } from "../../../atlas/AtlasEvents.js";
import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import { EventHandler } from "../../../core/structs/EventHandler.js";

const loc = ["LAGRANGE", "Gateway", "Events"]

export class EventSystem extends EventHandler {
  constructor() {
    super()
    Atlas.on(AtlasEvents.guildCreate, (guildID, ownerID) => {
      // recieves the newly created guild and its id alongside the owner of the guild
      // as the owner will always be the first member and joins alongside the guild
      Logger.sendLog(LogLevel.Verbose, loc, "syncing guilds [reason: guildCreate]")
    })
    Atlas.on(AtlasEvents.guildRemove, (guildID, ownerID) => {
      Logger.sendLog(LogLevel.Verbose, loc, "syncing guilds [reason: guildRemove]")
    })
    Atlas.on(AtlasEvents.channelCreate, (guildID, channelID) => {
      Logger.sendLog(LogLevel.Verbose, loc, "syncing channels [reason: channelCreate]")
    })
    Atlas.on(AtlasEvents.channelRemove, (guildID, channelID) => {
      Logger.sendLog(LogLevel.Verbose, loc, "syncing channels [reason: channelRemove]")
    })
  }
}