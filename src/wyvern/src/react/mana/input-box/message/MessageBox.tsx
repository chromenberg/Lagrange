import SlottedInputBox from "../slotted/SlottedInputBox";
import("./MessageBox.css");

/**
 * TODO: Should use its own implementation instead of use the base {@link SlottedInputBox} <- {@link BaseInputBox} implementation
 * @returns
 */
export default function MessageBox() {
  const slots = {
    left: [],
    right: [],
  };

  return (
    <SlottedInputBox
      className="messageBox messageBoxHeight"
      accessories={slots}
    >
      Placeholder Input Box // TODO: Make MessageBox use its own implementation and not the standard input box
    </SlottedInputBox>
  );
}
