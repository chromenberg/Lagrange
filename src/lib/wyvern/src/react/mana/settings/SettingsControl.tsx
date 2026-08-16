import type { Props } from "../../../Core";
import Stack from "../stack/Stack";
import("./SettingsControl.css");

export default function SettingControl({ children }: Props) {
  return <div className={`settingsControl`}>{children}</div>;
}
SettingControl.Labels = function Labels({ children }: Props) {
  return <div className="controlLabelContainer">{children}</div>;
};
SettingControl.Label = function Label({ children }: Props) {
  return <div className="controlLabel">{children}</div>;
};

SettingControl.Controls = function Controls({ children }: Props) {
  return <div className="controlContainer">{children}</div>;
};
SettingControl.Control = function Control({ children }: Props) {
  return (
    <div className="settingControl">
      <Stack justify="end" align="center" gap="medium">
        {children}
      </Stack>
    </div>
  );
};

// export default SettingControl
