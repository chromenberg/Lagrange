import type { Props } from "../../../Core";
import("./SettingsControl.css")

interface SettingControlProps extends Props {
}

export default function SettingControl({
  children,
}: SettingControlProps) {
 
  return (
    <div className={`settingsControl`}>
      {children}
    </div>
  );
}
