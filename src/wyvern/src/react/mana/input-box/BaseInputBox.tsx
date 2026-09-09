import type { Props } from "../../../Core";
import Stack from "../stack/Stack";
import("./InputBox.css");
export default function BaseInputBox({ children, className }: Partial<Props>) {
  // An input-box type can be chosen by entering a parameter in this component

  return (
    <div mana-type="input-box" className={"manaInputBoxContainer" + (className ? " " + className : "")}>
      <Stack
        align="center"
        gap="xsmall"
        className={"manaInputBox"}
      >
        {children}
      </Stack>
    </div>
  );
}
