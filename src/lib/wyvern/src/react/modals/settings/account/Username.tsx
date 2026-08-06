import type { WeakObj } from "../../../../scripts/types/WeakObj";
import ManaButton from "../../../mana/button/ManaButton";
import Labeled from "../../../mana/settings/SettingsControl";

export default function UsernameItem({ data }: { data: WeakObj }) {
  return (
    <Labeled spread>
      <span>Username</span>
      <div id="usernameContainer" className="labelValueContainer">
        <span id="usernameText">{data.username}</span>
      </div>
      <div className="buttonContainerSettings">
        <ManaButton
          height="medium"
          onclick={() => {
            console.log("Requested to change username");
          }}
          style="Tertiary"
        >
          Edit
        </ManaButton>
      </div>
    </Labeled>
  );
}
