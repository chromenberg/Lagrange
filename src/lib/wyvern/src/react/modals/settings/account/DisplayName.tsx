import type { WeakObj } from "../../../../scripts/types/WeakObj";
import ManaButton from "../../../mana/button/ManaButton";
import Labeled from "../../../mana/settings/SettingsControl";

export default function DisplayNameItem({ data }: { data: WeakObj }) {
  return (
    <Labeled>
      <span>Display Name</span>
      <div id="usernameContainer" className="labelValueContainer">
        <span id="usernameText">{data.display_name}</span>
      </div>
      <div className="buttonContainerSettings">
        <ManaButton
          height="medium"
          onclick={() => {
            console.log("Requested to change display name");
          }}
          style="Tertiary"
        >
          Edit
        </ManaButton>
      </div>
    </Labeled>
  );
}
