import type { Props } from "../../../Core"
import "./Button.css"

export default function Button({children, className, ...rest}: Props) {
  return <div className={"manaButton " + className} {...rest}>
    <div className="flexHoriz centerVert centerHori">
      {children}
    </div>
  </div>
}