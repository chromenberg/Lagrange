import type { WeakObj } from "../../../../scripts/types/WeakObj";
import Labeled from "../../../mana/settings/SettingsControl";

export default function UserIDItem({ data }: { data: WeakObj }) {
  return (
    <Labeled>
      <span>Account ID</span>
      <div id="usernameContainer" className="labelValueContainer">
        <span id="usernameText">{data.id}</span>
        <span id="usernameText">{data.id}</span>
      </div>
    </Labeled>
  );
}
