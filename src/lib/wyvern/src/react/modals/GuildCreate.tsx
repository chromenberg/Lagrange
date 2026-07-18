import { useRef} from "react";
import useToken from "../../scripts/client/requests/Authorization";
const InputBox = (await import("../components/InputBox/InputBox")).default;
const ActionRow = (await import("../mana/action-row/ActionRow")).default;

const ButtonGroup = (await import("../mana/button-group/ButtonGroup")).default;
// import Button from "../mana/button/Button";
const ManaButton = (await import("../mana/button/ManaButton")).default;
const Modal = (await import("./Modal")).default;

const ModalView = (await import("./ModalView")).default;
import("../styles/ModalStyles.css");

function requestGuildCreate(token: string, guildName: string) {
  fetch("/api/v1/guilds/", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      name: guildName,
      id: "",
    }),
  });
}

export default function CreateGuildModal({state}:{state?: (arg: boolean)=>void}) {
  const guildNameInput = useRef(null);
  const modalRef = useRef(null);
  const token = useToken();
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
                  state?.(false)
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
                    token,
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
