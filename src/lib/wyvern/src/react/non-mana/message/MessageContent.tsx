import type { Markup } from "../../../scripts/types/Markup";
import("./styles/MessageContent.css");
export default function MessageContent({
  id,
  content,
}: {
  id: string;
  content: Markup;
}) {
  return (
    <div id={"messages-" + id} className="messageContent messageMarkup">
      {content[0].content.toString()}
    </div>
  );
}
