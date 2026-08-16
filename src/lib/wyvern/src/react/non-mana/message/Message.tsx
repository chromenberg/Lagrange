// import type { Markup } from "../../../scripts/types/Markup";
import MessageContent from "./MessageContent";
import MessageContext from "./MessageContext";
import("./styles/Message.css")
interface UserData {
  id: string;
  avatar: string;
  display_name: string | null;
  username: string;
}

interface MessageData {
  user: UserData;
  properties: {
    timestamp: Date;
  };
  content: string;
  channel: string;
  id: string;
}

export default function Message({ info }: { info: MessageData }) {
  return (
    <li className="cozySpace messageContentWrapper">
      <div className="messageContents">
        <MessageContext user={info.user} info={info.properties} />
        <MessageContent id={info.id} content={info.content} />
      </div>
    </li>
  );
}
