import type { MouseEvent } from "react";
import type { Props } from "../../../Core";
import("./Button.css");
interface ButtonProps extends Props {
  callback: (ev: MouseEvent, ...args: unknown[]) => void;
  height?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  manaType?: string
}

export default function Button({
  manaType,
  children,
  className,
  callback,
  height,
  ...rest
}: ButtonProps) {
  return (
    <div mana-type={manaType??"button-base"} className={"manaButton " + className} onClick={callback} mana-button-height={height} {...rest}>
      <div className="flexHoriz centerVert centerHori">{children}</div>
    </div>
  );
}
