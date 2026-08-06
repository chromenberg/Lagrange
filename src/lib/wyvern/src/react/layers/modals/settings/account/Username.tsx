import type { WeakObj } from "../../../../../scripts/types/WeakObj";
import TextButton from "../../../../mana/button/ManaTextButton";

import SettingsControl from "../../../../mana/settings/SettingsControl";
import Stack from "../../../../mana/stack/Stack";

export default function UsernameItem({ data }: { data: WeakObj }) {
  return (
    <Stack align="stretch" justify="start" direction="vertical">
      <SettingsControl>
        {/* labels area for the settings control component*/}
        {/* can have multiple labels*/}
        <SettingsControl.Labels>
          <SettingsControl.Label>Username</SettingsControl.Label>
        </SettingsControl.Labels>
        {/* controls area for the settings control component*/}
        {/* can contain multiple controls*/}
        <SettingsControl.Controls>
          <SettingsControl.Control>
            <div className="labelValueContainer">
              <span>{data.username}</span>
            </div>
            <div className="buttonContainerSettings">
              <TextButton
                height="medium"
                onclick={() => {
                  console.log("Requested to change username");
                }}
                className="controlButton"
                text="Edit"
              >
                
              </TextButton>
            </div>
          </SettingsControl.Control>
        </SettingsControl.Controls>
      </SettingsControl>
    </Stack>
  );
}
