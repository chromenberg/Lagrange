import type { Props } from "../../../Core";
import Stack from "../stack/Stack";
import("./InputBox.css")
export default function BaseInputBox({children}: Partial<Props>) {
  // An input-box type can be chosen by entering a parameter in this component

  return (
    <div mana-type="input-box" className="manaInputBox">
      <Stack fillAll align="center">
        {children}
      </Stack>
    </div>
  );
}
