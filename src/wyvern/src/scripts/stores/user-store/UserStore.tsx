const { useState } = await import("react");
const EventSystem = (await import("../../core/EventSystem")).default;
import type { User } from "../../types/UserTypes";
import type { ReadyEvent } from "../../types/ReadyType";
import { useEffect } from "react";
/* (data: ReadyEvent) => {
  console.log("[Stores/UserInfo] Synchronizing")
  setUserInfo({
    username: data.user.username,
    display_name: data.user.display_name,
    id: data.user.id,
    email: data.user.email,
    avatar: data.user.avatar,
    discriminator: data.user.discriminator
  } */
// this is actually the clients info instead of the user, this is an incorrect name as the CLIENT refers to the current user
function useUserInfo() {
  const [userData, setUserInfo] = useState<Partial<User>>({});
  useEffect(() => {
    EventSystem.once("GUILD_MEMBER_ADD");
    EventSystem.once("");
    });
    
  }, []);
  console.log(userData)
  return userData;
}

export default useUserInfo;
