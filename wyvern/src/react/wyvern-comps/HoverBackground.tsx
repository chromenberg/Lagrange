import type { Props } from "../../Core";
import("../styles/Interactions.css")
export default function HoverBackground({children}: Props) {
  return <div className="hoverCardBg">{children}</div>
}