import type { Props } from "../../../../Core";
import type { SizingName } from "../../../../scripts/types/SizingTypes";
import BaseInputBox from "../BaseInputBox";

type InputBoxProps = Partial<Props> & {
  height: SizingName;
};

function parseHeight(height: SizingName): string {
  switch (height) {
    case "xsmall":
      return "inputBox-xs";
    case "small":
      return "inputBox-sm";
    case "medium":
      return "inputBox-md";
    case "large":
      return "inputBox-lg";
    case "xlarge":
      return "inputBox-xl";
  }
}

export default function InputBox({ children, height }: InputBoxProps) {
  return <BaseInputBox className={parseHeight(height)}>{children}</BaseInputBox>;
}
