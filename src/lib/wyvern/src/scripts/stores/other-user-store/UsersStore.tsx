import { useEffect, useMemo} from "react";
import EventSystem from "../../core/EventSystem";

export default function useUsersStore() {
  const usersMap = useMemo(() => {
    return new Map();
  }, []);
  
  useEffect(() => {
    EventSystem.once("USER_UPDATE", (data) => {
      usersMap.set(data.id, data);
    });
  }, [usersMap]);

  const users = [];
  for (const user of usersMap.entries()) {
    users.push(user);
  }
  
  return users;
}
