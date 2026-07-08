const { useState } = await import("react");
const EventSystem = (await import("../../core/EventSystem")).default;
import type { ClientUser } from "../../types/UserTypes";
import type { ReadyEvent } from "../../types/ReadyType";
import { useEffect } from "react";

function useUserInfo() {
  const [userData, setUserInfo] = useState<Partial<ClientUser>>({});

  useEffect(() => {
    console.log("sdgdgf")
    EventSystem.on("READY", (data: ReadyEvent) => {
      console.log("1111")
      setUserInfo({
        username: data.user.username,
        display_name: data.user.display_name,
        id: data.user.id,
        email: data.user.email,
      });
    });
    
  }, []);

  return userData;
}

export default useUserInfo;
