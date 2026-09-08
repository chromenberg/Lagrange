import type { Props } from "../../../Core";
import type { Direction, SizingName } from "../../../scripts/types/SizingTypes";
import("./Stack.css");

type Positionings = "center" | "start" | "end" | "stretch";

interface StackProps extends Props {
  /**
   * Controls the alignment of elements vertically.
   *
   * For example, `start` would position the children at the top of the element
   */
  align: Positionings;
  /**
   * Controls the alignment of elements horizontally
   *
   * For example, `start` would position the children at the left of the element
   */
  justify: Positionings;
  direction: Direction;
  gap: SizingName;
  wrap: boolean;
  fillWidth: boolean;
  fillHeight: boolean;
  fillAll: boolean;
  [rest: string]: unknown
}

export default function Stack({
  fillHeight,
  fillWidth,
  direction,
  className,
  children,
  fillAll,
  justify,
  align,
  wrap,
  gap,
  ...rest
}: Partial<StackProps>) {
  return (
    <div
      data-full-width={fillWidth}
      data-full-height={fillHeight}
      data-full={fillAll}
      data-justify={justify}
      data-align={align}
      data-wrap={wrap}
      data-direction={direction ?? "horizontal"}
      data-stack-gap={gap}
      className={"stack " + (className ?? "")}
      {...rest}
    >
      {children}
    </div>
  );
}
