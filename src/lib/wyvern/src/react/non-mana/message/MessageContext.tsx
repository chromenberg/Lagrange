import MessageAvatar from "./MessageAvatar";

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
  return (
    <>
      <MessageAvatar avatar={user.avatar} id={user.id}/>
      <div className="messageContext">
        <span className="messageDisplayname">
          {user.display_name ?? user.username}
        </span>
        <span>
          <time dateTime={info.timestamp.toString()}></time>
        </span>
      </div>
    </>
  );
}
