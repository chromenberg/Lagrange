import { createContext } from "react";

type UserContext = {
  currentChannel: string;
  currentGuild: string;
  username: string;
  display_name: string;
  id: string;
  token: string;
  guilds: {
    id: string;
    unavailable: boolean;
  }[];
};

const UserContext = createContext<Partial<UserContext>>({});
export default UserContext;
