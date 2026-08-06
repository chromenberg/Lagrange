import type { Props } from "../../../../Core";
import type { InteractiveProps } from "../../../../scripts/types/Button";
import { Icons } from "../../../../scripts/types/Icons";
import IconButton from "../IconButton";
import("../styles/CloseButton.css");
const PathData = Icons["exit-cross"];
export default function CloseButton({
  style,
  className,
}: InteractiveProps & Partial<Props>) {
  return (
    <IconButton
      width="16"
      height="16"
      viewbox={{ width: "24", height: "24" }}
      callback={() => console.log("Got close event")}
      className={"manaCloseButton " + (className??"")}
      style={style}
    >
      <PathData />
    </IconButton>
  );
}
