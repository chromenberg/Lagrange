import CloseButton from "../../../mana/button/subtypes/Close";
import Modal from "../Modal";
import ModalView from "../ModalView";
import("./AvatarUpload.css");
import("../../../styles/Header.css");

export default function AvatarUploadModal({
  state,
}: {
  state?: (arg: boolean) => void;
}) {
  return (
    <ModalView>
      <div className="modalContainerInner">
        <Modal style="modal" classes="modalType1">
          <div className="panel_avatarUpload">
            <header className="header_avatarUpload">
              <div className="headerLayout">
                <div className="headerMain">
                  <h1 className="semibold heading-lg">Select an Image</h1>
                </div>
                <div className="headerLast_avatarUpload">
                  <CloseButton callback={() => state?.(false)} />
                </div>
              </div>
            </header>
          </div>
        </Modal>
      </div>
    </ModalView>
  );
}
