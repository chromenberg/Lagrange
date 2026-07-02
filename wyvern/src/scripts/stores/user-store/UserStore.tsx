import { useState } from "react";
import EventSystem from "../../core/EventSystem";
import type { UserData } from "../../types/UserType";
import type { SelfUser } from "../../types/Generics";
import type { ReadyEvent } from "../../types/ReadyType";

function useUserInfo() {
  const [userData, setUserInfo] = useState<Partial<SelfUser<UserData>>>({});

  EventSystem.on("READY", (data: ReadyEvent) => {
    setUserInfo({
      username: data.user.username,
      display_name: data.user.display_name,
      id: data.user.id,
      email: data.user.email,
    });
  });

  return userData;
}

export default useUserInfo;
