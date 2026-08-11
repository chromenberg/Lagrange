import { createContext,  } from "react";
import type { ClientUser } from "../types/UserTypes";

const UserContext = createContext<Partial<ClientUser>>({})
export default UserContext