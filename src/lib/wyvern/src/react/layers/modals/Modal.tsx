import type { Props } from "../../../Core";
import("./ModalStyles.css")

interface ModalProps extends Props {
  width?: string;
  height?: string;
  style: "modal" | "criticalModal";
  [rest: string]: unknown
}

/**
 * Creates a popover on the screen that is positioned above everything. Helpful for overlays
 * @param param0
 * @returns
 */
export default function Modal({
  children,
  classes,
  style,
  ...rest
}: ModalProps) {
  return (
    <div
      className={(classes ?? "") + " modalPopoverBase"}
      data-modal-style={style}
      {...rest}
    >
      {children}
    </div>
  );
}
