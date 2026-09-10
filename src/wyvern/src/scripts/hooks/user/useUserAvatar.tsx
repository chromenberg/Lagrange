import { attachments, routes } from "../../client/Routes";
import { populate } from "../../core/SetPlaceholders";
import useUserStore from "../../stores/user-store/UserStore";

const useUserAvatarById = (id: string) => {
  const avatar = useUserStore()[id]?.avatar;
  if (!avatar || Object.keys(avatar).length === 0) return "no_avatar";

  return populate(attachments + routes.user_avatars, id, avatar);
};
export default useUserAvatarById;
