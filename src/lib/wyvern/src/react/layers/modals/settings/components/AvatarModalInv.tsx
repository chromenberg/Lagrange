import ManaButton from "../../../../mana/button/ManaButton";
import InvokeModal from "../../../../mana/wrappers/InvokeModal";
import AvatarUploadModal from "../../upload-avatar/AvatarUpload";

export default function AvatarModalInv() {
  return (
    <InvokeModal modal={<AvatarUploadModal />}>
      <ManaButton style="Primary">Upload</ManaButton>
    </InvokeModal>
  );
}
