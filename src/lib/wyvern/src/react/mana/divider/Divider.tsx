import type {
    BorderStyle,
  Direction,
  SizingName,
  Thickness,
} from "../../../scripts/types/SizingTypes";
import("./Divider.css")
interface DividerProps {
  gap?: SizingName | "none";
  padding: SizingName;
  direction: Direction;
  thickness: Thickness;
  color: BorderStyle
}
export default function Divider({
  thickness,
  direction,
  padding,
  color,
  gap
}: DividerProps) {
  return (
    <div
      mana-type="divider"
      divider-thickness={thickness}
      divider-direction={direction}
      divider-padding={padding}
      divider-color={color}
      divider-gap={gap}
    ></div>
  );
}
