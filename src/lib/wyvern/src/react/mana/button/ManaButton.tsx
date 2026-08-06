import type { MouseEvent } from "react";
import type { Props } from "../../../Core";
import type { SizingName } from "../../../scripts/types/SizingTypes";
const Button = (await import("./Button")).default;

type ButtonStyle = "Primary" | "Secondary" | "Tertiary" | "Success" | "Danger";
interface ButtonProps extends Props {
  onclick: (ev: MouseEvent<Element>, ...args: unknown[]) => void;
  height?: SizingName;
}

export default function ManaButton({
  style,
  children,
  onclick,
  height,
  className,
  ...rest
}: ButtonProps & {
  style?: ButtonStyle;
  active?: boolean;
}) {
  return (
    <Button
      manaType="button"
      height={height}
      callback={onclick}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Button>
  );
}
