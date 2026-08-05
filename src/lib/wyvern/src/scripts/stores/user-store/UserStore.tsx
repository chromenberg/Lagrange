const { useState } = await import("react");
const EventSystem = (await import("../../core/EventSystem")).default;
import type { ClientUser } from "../../types/UserTypes";
import type { ReadyEvent } from "../../types/ReadyType";
import { useEffect } from "react";

function useUserInfo() {
  const [userData, setUserInfo] = useState<Partial<ClientUser>>({});
  useEffect(() => {
    EventSystem.once("READY", (data: ReadyEvent) => {
      console.log("[Stores/UserInfo] Synchronizing")
      setUserInfo({
        username: data.user.username,
        display_name: data.user.display_name,
        id: data.user.id,
        email: data.user.email,
        avatar: data.user.avatar,
        discriminator: data.user.discriminator
      });
    });
    
  }, []);
  console.log(userData)
  return userData;
}

export default useUserInfo;
