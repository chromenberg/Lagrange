import { useEffect, useState } from "react";
import type { GuildStore } from "../StoreTypes";
import EventSystem from "../../core/EventSystem";
// import type { GuildMemberUpdateData } from "./GuildUpdateType";
import type { ReadyEvent } from "../../types/ReadyType";

function useGuildStore() {
  const [guildStore, setGuildStore] = useState<GuildStore>([]);

  useEffect(() => {
    EventSystem.once("READY", async (data: ReadyEvent) => {
      setGuildStore(data.guilds);
      console.log(data.guilds);
    });
  }, []);

  useEffect(() => {
    // Every time guildStore is updated, we need to reassign a listener to the EventSystem
    // This merges the new guild info into the current guild info that is stored
    EventSystem.once("GUILD_CREATE", (data) => {
      setGuildStore(guildStore.concat(data))
    });
  }, [guildStore])
  
  EventSystem.on("GUILD_MEMBER_ADD", (data) => {
    console.log(data);
  });
  EventSystem.on("GUILD_MEMBER_REMOVE", (data) => {
    console.log(data);
  });
  EventSystem.on("GUILD_DELETE", (data) => {
    console.log(data);
  });

  return guildStore;
}

export default useGuildStore;
