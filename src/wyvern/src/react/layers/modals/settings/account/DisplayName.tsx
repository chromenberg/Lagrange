import UserContext from "../../../../../scripts/hooks/UserContext";

import ManaButton from "../../../../mana/button/ManaButton";
import SettingsControl from "../../../../mana/settings/SettingsControl";
import Stack from "../../../../mana/stack/Stack";

export default function DisplayNameItem() {
  return (
    <Stack align="stretch" justify="start" direction="vertical">
      <UserContext.Consumer>
        {(data) => {
          console.log("UserContext has updated");
          return (
            <SettingsControl>
              {/* labels area for the settings control component*/}
              {/* can have multiple labels*/}
              <SettingsControl.Labels>
                <SettingsControl.Label>Display Name</SettingsControl.Label>
              </SettingsControl.Labels>
              {/* controls area for the settings control component*/}
              {/* can contain multiple controls*/}
              <SettingsControl.Controls>
                <SettingsControl.Control>
                  <div className="labelValueContainer">
                    <span>{data.display_name}</span>
                  </div>
                  <div className="buttonContainerSettings">
                    <ManaButton
                      height="medium"
                      onclick={() => {
                        console.log("Requested to change display name");
                      }}
                      className="controlButton"
                    >
                      Edit
                    </ManaButton>
                  </div>
                </SettingsControl.Control>
              </SettingsControl.Controls>
            </SettingsControl>
          );
        }}
      </UserContext.Consumer>
    </Stack>
  );
}
