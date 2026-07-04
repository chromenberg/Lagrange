import type { Props } from "../../../Core";
import("./ActionRow.css")
export default function ActionRow({children}: Props) {
  return <div className="manaActionRow" mana-type="action-row">
    {children}
  </div>
}