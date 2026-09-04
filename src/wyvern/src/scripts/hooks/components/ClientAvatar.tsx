import { useContext, useEffect } from "react";
import { populate } from "../../core/SetPlaceholders";
import { attachments, routes } from "../../client/Routes";
import UserContext from "../UserContext";
import("../../../react/styles/Avatar.css")

export default function ClientAvatar() {
  const clientInfo = useContext(UserContext)
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
      <img width={40} height={40}
        src={`${attachments + populate(routes.user_avatars, clientInfo.id as string, clientInfo.avatar)}?size=64`}
      ></img>
    );

  return <div className="avatarIcon">{conditional}</div>;
}
