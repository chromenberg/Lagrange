import { createPortal } from "react-dom";
import type { Props } from "../../../Core";
import("./ModalView.css");
function ModalWrapper({ children }: Props) {
  return (
    <div className="modalLayer">
      <div className="modalContainer">{children}</div>
    </div>
  );
}

export default function ModalView({ children }: Props) {
  const modalPortal = document.getElementById("modal-portal");
  if (modalPortal === null) {
    return (
      <div className="errorToast">
        <div>
          No element for <b>modal-portal</b> was found.
        </div>
      </div>
    );
  }
  return createPortal(<ModalWrapper>{children}</ModalWrapper>, modalPortal);
}
