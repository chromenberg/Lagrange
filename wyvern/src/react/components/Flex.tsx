import type { Props } from "../../Core";
import "./Flex.css";
type FlexDirections = "updown" | "downup" | "leftright" | "rightleft";

export default function FlexBox({
  children,
  direction,
  className,
}: Props & {
  direction: FlexDirections;
}) {
  return (
    <div className={`flex${direction} ${className ?? ""}`}>
      {children}
    </div>
  );
}
