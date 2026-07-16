import { useState } from "react";
// import Modal from "../../modals/Modal";
// import ModalView from "../../modals/ModalView";
import CreateGuildModal from "../../modals/GuildCreate";

export default function InvokeModal({
  // modal,
  children,
}: {
  // modal: React.ReactNode;
  children?: React.ReactNode;
}) {
  console.log("sfdgdfgsdsdf");
 
  const [isModalOpen, setModalOpen] = useState(false);

  console.log(isModalOpen)
  const loadModal = () => {
    if (isModalOpen) {
      return <CreateGuildModal state={setModalOpen} />
    } else {
      return undefined;
    }
  };

  return (
    <div
      onClick={() => {
        setModalOpen(true)
      }}
      data-fill
    >
      {children}
      {loadModal()}
    </div>
  );
}
