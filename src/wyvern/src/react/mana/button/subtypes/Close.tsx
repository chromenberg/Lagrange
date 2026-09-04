import type { Props } from "../../../../Core";
import type { InteractiveProps } from "../../../../scripts/types/Button";
import type { AnyCallback } from "../../../../scripts/types/Callbacks";
import { Icons } from "../../../../scripts/types/Icons";
import IconButton from "../IconButton";
import("../styles/CloseButton.css");
const PathData = Icons["exit-cross"];
export default function CloseButton({
  style,
  callback,
  className,
}: InteractiveProps & Partial<Props> & { callback: AnyCallback }) {
  return (
    <IconButton
      width="16"
      height="16"
      viewbox={{ width: "24", height: "24" }}
      className={"manaCloseButton " + (className??"")}
      style={style}
      callback={callback}
    >
      <PathData />
    </IconButton>
  );
}
