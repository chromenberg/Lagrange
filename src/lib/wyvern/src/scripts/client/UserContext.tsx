import type { GuildStore } from "../stores/StoreTypes";
import type { SelfUser } from "../types/Generics";
import type { UserData } from "../types/UserType";

const createContext = (await import("react")).createContext;

type UserContext = {
  user: SelfUser<UserData>,
  guilds: GuildStore
};

const UserContext = createContext<Partial<UserContext>>({});
export default UserContext;
