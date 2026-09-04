import { attachments, routes } from "../../../scripts/client/Routes";
import { populate } from "../../../scripts/core/SetPlaceholders";
import AvatarSizing from "../../../sizings/AvatarSizings";
import("./styles/MessageAvatar.css")
export default function MessageAvatar({
  id,
  avatar,
}: {
  id: string;
  avatar: string;
}) {
  return (
    <div className="messageAvatarWrapper">
      <div className="messageAvatar">
        <img
          src={attachments+populate(routes.user_avatars, id, avatar)+"?size=64"}
          width={AvatarSizing.Message.size}
          height={AvatarSizing.Message.size}
        />
      </div>
    </div>
  );
}
