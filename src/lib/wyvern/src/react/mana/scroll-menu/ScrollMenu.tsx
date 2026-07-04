import type { Props } from "../../../Core";

import("../../styles/ScrollMenu.css")

export default function ScrollMenu({children}: Props) {
  return <div mana-type="scroll-menu">{children}</div>
}
