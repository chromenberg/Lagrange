import { useEffect, useState } from "react";
import type { GuildStore } from "../StoreTypes";
import EventSystem from "../../core/EventSystem";
// import type { GuildMemberUpdateData } from "./GuildUpdateType";
import type { ReadyEvent } from "../../types/ReadyType";
import getAllGuilds from "../../client/requests/GetAllGuilds";
import useToken from "../../client/requests/Authorization";

function useGuildStore() {
  const [guildStore, setGuildStore] = useState<GuildStore>([]);
  const token = useToken();
  useEffect(() => {
    EventSystem.on("READY", async (data: ReadyEvent) => {
      setGuildStore([]);
      // get all guilds by mapping the unavailable guilds array to only have the IDs
      console.log(
        getAllGuilds(
          token,
          data.guilds.map((guild) => guild.id),
        ).map(async (data) => await data),
      );
    });
  });
  // const id = userStore()
  // const addGuild = (data: GuildMemberUpdateData  ) => {
  //   if (data.user.id === )
  // }

  // const removeGuild = (data: GuildMemberUpdateData ) => {

  // }

  EventSystem.on("GUILD_MEMBER_ADD", (data) => {
    console.log(data);
  });
  EventSystem.on("GUILD_MEMBER_REMOVE", (data) => {
    console.log(data);
  });
  EventSystem.on("GUILD_CREATE", (data) => {
    console.log(data);
  });
  EventSystem.on("GUILD_DELETE", (data) => {
    console.log(data);
  });

  return guildStore;
}

export default useGuildStore;
