import type { Props } from "../../../Core";
import("../../styles/ModalStyles.css")

/**
 * Creates a popover on the screen that is positioned above everything. Helpful for overlays
 * @param param0 
 * @returns 
 */
export default function Modal({
  children,
  width,
  height,
  classes,
  ...rest
}: Props & {
  width?: string;
    height?: string;
  [rest:string]:unknown
}) {
  return (
    <div
      className={(classes??"")+" modalPopoverBase"}
      style={{
        width: width ?? "",
        height: height ?? "",
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
