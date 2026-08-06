import type { WeakObj } from "../../../../../scripts/types/WeakObj";
import SettingsControl from "../../../../mana/settings/SettingsControl";
import Stack from "../../../../mana/stack/Stack";

export default function UserIDItem({ data }: { data: WeakObj }) {
  return (
    <Stack align="stretch" justify="start" direction="vertical">
      <SettingsControl>
        {/* labels area for the settings control component*/}
        {/* can have multiple labels*/}
        <SettingsControl.Labels>
          <SettingsControl.Label>Account ID</SettingsControl.Label>
        </SettingsControl.Labels>
        {/* controls area for the settings control component*/}
        {/* can contain multiple controls*/}
        <SettingsControl.Controls>
          <SettingsControl.Control>
              <div className="labelValueContainer">
                <span>{data.id}</span>
              </div>
          </SettingsControl.Control>
        </SettingsControl.Controls>
      </SettingsControl>
    </Stack>
  );
}
