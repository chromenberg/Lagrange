import { createPortal } from "react-dom";
import type { Props } from "../../../Core";

export default function ModalView({ children }: Props) {
  const modalPortal = document.getElementById("modal-portal")
  if (modalPortal === null) {
    return <div className="errorToast">
      <div>
        No element for <b>modal-portal</b> was found.
      </div>
    </div>
  }
  return createPortal(<div className="modalContainer">{children}</div>, modalPortal);
}
