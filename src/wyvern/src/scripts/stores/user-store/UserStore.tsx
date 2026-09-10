const { useState } = await import("react");
const EventSystem = (await import("../../core/EventSystem")).default;
import type { User } from "../../types/UserTypes";
import type { ReadyEvent } from "../../types/ReadyType";
import { useEffect } from "react";
import type { WeakObj } from "../../types/WeakObj";
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

// const affectableEvents: (keyof EventTypes)[] = [
//   "GUILD_MEMBER_ADD",
//   "GUILD_MEMBER_UPDATE",
//   "USER_UPDATE",
//   "PRESENCE_UPDATE",
// ];

// interface MemberAddEvent {

// }

type UserMap = {
  [key: string]: Partial<User>;
};

// this is actually the clients info instead of the user, this is an incorrect name as the CLIENT refers to the current user
function useUserStore() {
  const [userData, setUserInfo] = useState<UserMap>({});

  // function memberAdd(hook: typeof setUserInfo, data: unknown) {
  //   setUserInfo;
  // }

  // const eventCallbacks = [(data) => {}];
  useEffect(() => {
    function update(data: WeakObj) {
      setUserInfo({
        ...userData,
        [data.user.id]: {
          username: data.user.username,
          display_name: data.user.display_name,
          id: data.user.id,
          avatar: data.user.avatar,
          discriminator: data.user.discriminator,
        },
      });
    }
    console.log("Updating user store");
    EventSystem.once("GUILD_MEMBER_ADD", (data: WeakObj) => {
      update(data);
    });
    EventSystem.once("USER_UPDATE", (data: WeakObj) => {
      update(data);
    });
    EventSystem.once("READY", (data: ReadyEvent) => {
      update(data);
    });
  }, [userData]);
  console.log(userData);
  return userData;
}

export default useUserStore;
