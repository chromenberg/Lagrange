import type {
    BorderStyle,
  Direction,
  SizingName,
  Thickness,
} from "../../../scripts/types/SizingTypes";
import("./Divider.css")
interface DividerProps {
  gap?: SizingName | "none";
  padding?: SizingName;
  direction?: Direction;
  thickness?: Thickness;
  color?: BorderStyle
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
      divider-thickness={thickness??"vthin"}
      divider-direction={direction??"horizontal"}
      divider-padding={padding??"xsmall"}
      divider-color={color??"subtle"}
      divider-gap={gap??"small"}
    ></div>
  );
}
