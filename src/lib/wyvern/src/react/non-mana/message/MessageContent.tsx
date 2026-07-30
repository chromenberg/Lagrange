import type { Markup } from "../../../scripts/types/Markup";


export default function MessageContent({id, content}: {id: string, content: Markup}) {
  return <div id={id} className="messageContent messageMarkup">
    {content[0].content.toString()}
  </div>
}