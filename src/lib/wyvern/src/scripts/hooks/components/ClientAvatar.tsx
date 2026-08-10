import { useEffect } from "react";
import useUserInfo from "../../stores/user-store/UserStore";
import { populate } from "../../core/SetPlaceholders";
import { attachments, routes } from "../../client/Routes";

export default function ClientAvatar() {
  const clientInfo = useUserInfo();
  useEffect(() => {
    console.log(
      "User info:",
      clientInfo.username,
      " | avatar hash:",
      clientInfo.avatar,
    );
  });

  // If the user has no avatar hash, use the fallback avatar instead.
  // Otherwise use the users avatar url
  const conditional =
    clientInfo.avatar === null || !clientInfo.avatar ? (
      <div>no</div>
    ) : (
      <img
        src={`${attachments + populate(routes.user_avatars, clientInfo.id as string, clientInfo.avatar)}`}
      ></img>
    );

  return <div>{conditional}</div>;
}
