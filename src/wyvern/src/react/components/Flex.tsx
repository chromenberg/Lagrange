import type { Props } from "../../Core";
import("./Flex.css");
type FlexDirections = "updown" | "downup" | "leftright" | "rightleft";
type CenterDirections = "horizontal" | "vertical" | "both";
export default function FlexBox({
  children,
  className,
  direction,
  center,
}: Props & {
  direction: FlexDirections;
  center?: CenterDirections;
}) {
  let centerClassName = "";
  switch (center) {
    case "both":
      centerClassName = "centerVert centerHori";
      break;

    case "horizontal":
      centerClassName = "centerHori";
      break;

    case "vertical":
      centerClassName = "centerVert";
      break;
  }
  return (
    <div className={`flex${direction} ${centerClassName} ${className ?? ""}`}>
      {children}
    </div>
  );
}
