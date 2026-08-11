import { MarkupText } from "../../../scripts/core/Markup";
import type { Markup } from "../../../scripts/types/Markup";
import("./styles/MessageContent.css");
export default function MessageContent({
  id,
  content,
}: {
  id: string;
  content: Markup;
  }) {
  const text = new MarkupText(
    content[0].content as string,
  ).match();
  return (
    <div id={"messages-" + id} className="messageContent messageMarkup" dangerouslySetInnerHTML={{__html:text}}>
      
      
    </div>
  );
}
