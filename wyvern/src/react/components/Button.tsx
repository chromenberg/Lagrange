import type { Props, VoidCallback } from "../../Core";
import("../styles/Button.css");
export default function Button({ children, callback }: Props & {
  callback: VoidCallback
}) {
  return <button className="noVisibility buttonRound" onClick={callback}>{children}</button>;
}
