import ClientAvatar from "../../../../../scripts/hooks/components/ClientAvatar";
import type { WeakObj } from "../../../../../scripts/types/WeakObj";
import TextButton from "../../../../mana/button/ManaTextButton";
import FileUploadButton from "../../../../mana/file-upload/FileUploadButton";

import SettingsControl from "../../../../mana/settings/SettingsControl";
import Stack from "../../../../mana/stack/Stack";
import AvatarModalInv from "../components/AvatarModalInv";

export default function AvatarItem({ data }: { data: WeakObj }) {
  return (
    <Stack align="stretch" justify="start" direction="vertical">
      <SettingsControl>
        {/* labels area for the settings control component*/}
        {/* can have multiple labels*/}
        <SettingsControl.Labels>
          <SettingsControl.Label>Avatar</SettingsControl.Label>
        </SettingsControl.Labels>
        {/* controls area for the settings control component*/}
        {/* can contain multiple controls*/}
        <SettingsControl.Controls>
          <SettingsControl.Control>
            <div className="labelValueContainer">
              <ClientAvatar />
            </div>
            <div className="buttonContainerSettings">
              <AvatarModalInv />
            </div>
          </SettingsControl.Control>
        </SettingsControl.Controls>
      </SettingsControl>
    </Stack>
  );
}
