import { Atlas } from "../../_Init.js";
import getIDFromToken from "./GetID.js";

export function getUserFromToken(token: string) {
  return Atlas.requests.users.getFullUserByToken(token)
}

export function isUserInGuild(token: string, guild_id: string) {
  Atlas.requests.users.getUserGuilds(token).then((data) => {
    console.log(data)
  })
}