import type { MouseEvent } from "react";
import type { Props } from "../../../Core";
import type { SizingName } from "../../../scripts/types/SizingTypes";
import ManaButton from "./ManaButton";
import("./TextButton.css")

type ButtonStyle = "Primary" | "Secondary" | "Tertiary" | "Success" | "Danger";
interface ButtonProps extends Partial<Props> {
  onclick: (ev: MouseEvent<Element>, ...args: unknown[]) => void;
  height?: SizingName;
  text: string;
}

export default function TextButton({
  style,
  text,
  height,
  className,
  onclick,
  ...rest
}: ButtonProps & {
  style?: ButtonStyle;
  active?: boolean;
}) {
  return (
    <ManaButton
      manaType="button"
      height={height}
      className={className}
      style={style}
      onclick={onclick}
      {...rest}
    >
      <span className="text-md">{text}</span>
    </ManaButton>
  );
}
