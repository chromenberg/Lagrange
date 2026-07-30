import MessageAvatar from "./MessageAvatar";
import("./styles/MessageContext.css")
interface MessageUser {
  id: string;
  username: string;
  display_name: string | null;
  avatar: string;
}

interface MessageInfoExtra {
  timestamp: Date;
}

interface MessageContext {
  user: MessageUser;
  info: MessageInfoExtra;
}

export default function MessageContext({ user, info }: MessageContext) {
  // const userData = useGetUser(user.id)
  return (
    <>
      <MessageAvatar avatar={user.avatar} id={user.id}/>
      <div className="messageContext">
        <span className="messageDisplayName">
          {user.display_name ?? user.username}
        </span>
        <span>
          <time dateTime={info.timestamp.toString()}></time>
        </span>
      </div>
    </>
  );
}
