import type {
  IconProps,
  ManaIconButtonProps,
} from "../../../scripts/types/Button";
import StandardSizings from "../../../sizings/StandardSizings";
import Icon from "../icon/Icon";
const Button = (await import("./Button")).default;
import("./IconButton.css");

export default function IconButton({
  children,
  size,
  callback,
  className,
  height,
  width,
  viewbox,
  style,
}: ManaIconButtonProps & Partial<IconProps>) {
  const sizing = StandardSizings[size??"medium"]; // get the size that the size name refers to
  return (
    <Button
      callback={callback}
      manaType="icon-button"
      className={`manaIconButton${className ? " " + className : ""}`}
      data-button-style={style}

    >
      
      <Icon height={height ?? sizing.toString()} width={width ?? sizing.toString()} viewbox={viewbox}>
        {children}
      </Icon>
    </Button>
  );
}
