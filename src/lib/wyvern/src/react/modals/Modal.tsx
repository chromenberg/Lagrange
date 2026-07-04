import type { Props } from "../../Core";
import("../styles/ModalStyles.css")

/**
 * Creates a popover on the screen that is positioned above everything. Helpful for overlays
 * @param param0 
 * @returns 
 */
export default function Modal({
  children,
  width,
  height,
  ...rest
}: Props & {
  width?: string;
    height?: string;
  [rest:string]:unknown
}) {
  return (
    <div
      className="modalPopoverBase modalBackground"
      style={{
        width: width ?? "fit-content",
        height: height ?? "fit-content",
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
