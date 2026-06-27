import { useRef } from "react";
const InputBox = (await import("../components/InputBox/InputBox")).default;
const ActionRow = (await import("../mana/action-row/ActionRow")).default;

const ButtonGroup = (await import("../mana/button-group/ButtonGroup")).default;
// import Button from "../mana/button/Button";
const ManaButton = (await import("../mana/button/ManaButton")).default;
const Modal = (await import("./Modal")).default;

const ModalView = (await import("./ModalView")).default;
import("../styles/ModalStyles.css");

function requestGuildCreate(guildName: string) {
  fetch("/api/v1/guilds/", {
    method: "POST",
    headers: {
      Authorization:
        "MTI2NDAwMzg2MDgzODU2Mzg0.ajukxA.A8se2Bl_Jo0HYDEfSRW2gmSCbY55Cst349AyvzgVEAQ",
    },
    body: JSON.stringify({
      name: guildName,
      id: "",
    }),
  });
}

export default function CreateGuildModal() {
  const guildNameInput = useRef(null);
  const modalRef = useRef(null);
  return (
    <ModalView>
      <Modal height="200px" width="400px" ref={modalRef}>
        <div className="guildCreateModal">
          <div
            style={{
              height: "100%",
              padding: "16px",
              gap: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>Create a Guild</h3>
            <div
              className="flexVert centerHori centerVert"
              style={{ marginTop: "auto", width: "100%" }}
            >
              <ActionRow>
                <InputBox placeholder="Enter a name" ref={guildNameInput} />
              </ActionRow>
            </div>

            <ButtonGroup>
              <ManaButton
                style="Tertiary"
                mana-type="text-button"
                onClick={() => {
                  (modalRef.current as unknown as HTMLDivElement).remove();
                }}
              >
                Cancel
              </ManaButton>
              <ManaButton
                style="Primary"
                mana-type="text-button"
                onClick={() => {
                  // FIXME: this is shit
                  requestGuildCreate(
                    (guildNameInput.current as unknown as HTMLDivElement)
                      .innerText,
                  );
                  (modalRef.current as unknown as HTMLDivElement).remove();
                }}
              >
                Create Guild
              </ManaButton>
            </ButtonGroup>
          </div>
        </div>
      </Modal>
    </ModalView>
  );
}
