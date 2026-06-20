import type { Props } from "../../../Core";
import Button from "./Button";

type ButtonStyle = "Primary" | "Secondary" | "Tertiary" | "Success" | "Danger";

export default function ManaButton({
  style,
  children,
  ...rest
}: Props & {
  style: ButtonStyle;
  active?: boolean;
}) {
  return <Button className={`manaButton${style}`} {...rest} >{children}</Button>;
}
