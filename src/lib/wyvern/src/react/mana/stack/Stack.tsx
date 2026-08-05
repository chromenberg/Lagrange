import type { Props } from "../../../Core";
import type { Direction, SizingName } from "../../../scripts/types/SizingTypes";
import("./Stack.css")

export default function Stack({
  className,
  direction,
  children,
  gap,
}: Props & {
  direction?: Direction;
  gap?: SizingName;
}) {
  return (
    <div
      data-fill
      className={className}
      data-stack
      stack-direction={direction ?? "vertical"}
      stack-gap={gap ?? "small"}
    >
      {children}
    </div>
  );
}
