import type { ManaTextButtonProps } from "../../../scripts/types/Button";
import("./Button.css");

export default function Button({
  manaType,
  children,
  className,
  callback,
  height,
  style,
  ...rest
}: ManaTextButtonProps & { style?: string }) {
  return (
    <button
      mana-type={manaType ?? "button-base"}
      onClick={callback}
      mana-button-height={height}
      data-button-theme={style}
      className={"manaButton " + (className ?? "")}
      {...rest}
    >
      <div className="buttonChildrenWrapper">
        <div className="buttonChildren">
          {children}
        </div>
      </div>
    </button>
  );
}
