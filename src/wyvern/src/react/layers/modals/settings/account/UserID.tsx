import UserContext from "../../../../../scripts/hooks/UserContext";
import SettingsControl from "../../../../mana/settings/SettingsControl";
import Stack from "../../../../mana/stack/Stack";

export default function UserIDItem() {
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
          )
        }}
    </UserContext.Consumer>
    </Stack>
  );
}
