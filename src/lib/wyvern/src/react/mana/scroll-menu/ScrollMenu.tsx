import type { Props } from "../../../Core";
import("./ScrollMenu.css");
import("../../styles/ScrollMenu.css");
import("../../styles/Gaps.css");
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
  return GapSize[gap];
}
export default function ScrollMenu({
  children,
  direction,
  gap,
  className,
}: Props & { direction: ScrollDirs; gap?: keyof typeof GapSize }) {
  return (
    <div
      className={className}
      mana-type="scroll-menu"
      data-stack-gap={parseGap(gap)}
      data-stack-direction={direction}
    >
      {children}
    </div>
  );
}
