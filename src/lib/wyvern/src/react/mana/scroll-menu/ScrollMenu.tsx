import type { Props } from "../../../Core";

import("../../styles/ScrollMenu.css");
import("../../styles/Gaps.css")
// Only allow vertical or horizontal
type ScrollDirs = "vertical" | "horizontal";
const GapSize = {
  xSmall: "XS",
  small: "SM",
  med: "M",
  large: "L",
  xLarge: "XL",
};

function parseGap(gap?: keyof typeof GapSize): string {
  if (!gap) return "";
  return " gap" + GapSize[gap];
}
export default function ScrollMenu({
  children,
  direction,
  gap,
  className
}: Props & { direction: ScrollDirs; gap?: keyof typeof GapSize }) {
  return (
    <div className={className+" scrollMenuContainer"} mana-type="scroll-menu">
      <div className={"scrollMenu-" + direction + parseGap(gap)}>
        {children}
      </div>
    </div>
  );
}
