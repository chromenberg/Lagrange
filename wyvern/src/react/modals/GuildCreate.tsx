const ButtonGroup = (await import("../mana/button-group/ButtonGroup")).default;
// import Button from "../mana/button/Button";
const ManaButton = (await import("../mana/button/ManaButton")).default;
const Modal = (await import("./Modal")).default;

const ModalView = (await import("./ModalView")).default;
import("../styles/ModalStyles.css");

export default function CreateGuildModal() {
  return (
    <ModalView>
      <Modal height="300px" width="400px">
        <div className="guildCreateModal">
          <div>
            
          </div>
          <div style={{ height: "100%", padding: "16px", gap: "8px", display: "flex", flexDirection: "column", alignItems:"center"}}>
            <h3>Are you sure?</h3>
            <div className="flexVert centerHori centerVert"><i>This action is irreversible, your account will</i><i>be deleted in 2 weeks or whatever</i></div>
            <ButtonGroup>
              <ManaButton style="Danger" mana-type="text-button">Delete Account</ManaButton>
              <ManaButton style="Tertiary" mana-type="icon-button">X</ManaButton>
            </ButtonGroup>
          </div>
        </div>
      </Modal>
    </ModalView>
  );
}
