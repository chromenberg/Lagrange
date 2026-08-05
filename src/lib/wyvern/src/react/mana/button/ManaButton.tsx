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
  ...rest
}: ButtonProps & {
  style: ButtonStyle;
  active?: boolean;
}) {
  return (
    <Button
      manaType="button"
      height={height}
      callback={onclick}
      className={`manaButton${style}`}
      {...rest}
    >
      {children}
    </Button>
  );
}
