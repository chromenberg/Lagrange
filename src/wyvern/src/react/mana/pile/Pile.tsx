import type { Props } from "../../../Core";
import type { SizingName } from "../../../scripts/types/SizingTypes";
import Stack from "../stack/Stack";
import("./PileItem");
import("./Pile.css");
import("./PileOverlaps.css");

type PileProps = {
  outerClass?: string;
  innerClass?: string;
  overlap: SizingName;
  [rest: string]: unknown;
} & Partial<Props>;

export default function Pile({
  children,
  outerClass,
  innerClass,
  overlap,
  ...rest
}: PileProps) {
  return (
    <div
      mana-type="pile"
      className={outerClass}
      data-pile-overlap={overlap}
      {...rest}
    >
      <Stack fillAll align="center" className={innerClass}>
        {children}
      </Stack>
    </div>
  );
}
