/* eslint-disable @typescript-eslint/ban-ts-comment */
const { useState, cloneElement, useMemo } = await import("react");
export default function InvokeModal({
  modal,
  children,
}: {
  modal: React.ReactElement;
  children?: React.ReactNode;
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  
  // Define the state property for the modal
  // This should run only ONCE, if it runs multiple times, this is not intended
  const modalFixed = useMemo(() => {
    // @ts-ignore - this is a valid property which is present on all modals
    return cloneElement(modal, { state: setModalOpen });
  }, [modal]);

  return (
    <>
      <div
        onClick={() => {
          setModalOpen(true);
        }}
        className="modalInvokeWrapper"
        data-fill // Fill the entire area given
      >
        {children}
      </div>
      {/* Conditionally render the modal if the button was pressed */}
      {isModalOpen && modalFixed}
    </>
  );
}
