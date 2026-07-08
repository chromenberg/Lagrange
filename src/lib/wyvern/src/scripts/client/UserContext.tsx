import type { GuildStore } from "../stores/StoreTypes";
import type { ClientUser } from "../types/UserTypes";

const createContext = (await import("react")).createContext;

type UserContext = {
  user: ClientUser,
  guilds: GuildStore
};

const UserContext = createContext<Partial<UserContext>>({});
export default UserContext;
