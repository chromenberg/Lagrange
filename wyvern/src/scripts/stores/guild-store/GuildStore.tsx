import { useState } from "react";
import type { GuildStore } from "../StoreTypes";

function useGuildStore() {
  const guildStore = useState<GuildStore>([]);
  return guildStore;
}

export default useGuildStore;
