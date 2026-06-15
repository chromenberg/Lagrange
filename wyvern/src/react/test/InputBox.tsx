import { useState } from "react";
import "./InputBox.css";
import PlaceholderText from "./Placeholder/PlaceholderText";

// function setInput(inp, inpVal): void {
//   // if state already true
//   if (inpVal) {
//     return;
//   }
//   inp(true);
// }
function InputBoxHook({
  children,
  hook,
}: {
  children: React.ReactNode;
  hook: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      {children}
    </div>
  );
}

function InputContent() {
  return (
    <div
      contentEditable
      onKeyDown={(e) => {
        e.preventDefault();
        hook(true)
      }}
      onBeforeInputCapture={(e)=>{console.log("Before input capture", e)}}
      onChange={(e)=>{console.log("On Change", e)}}
      onEmptied={(e)=>{console.log("Empty", e)}}
    ></div>
  );
}

// this is the BASE input box that everything should go off of
// but for now just making it a full thing is fine
export default function InputBox() {
  const [inputState, setInputState] = useState(false);
  return (
    <div className="inputBoxWrapper">
      <div className="inputInnerContainer">
        <div className="inputBoxAccessories">#</div>
        <div className="separator" />
        <div>
          <PlaceholderText isActive={inputState}>s</PlaceholderText>
          <InputBoxHook hook={setInputState}>
            <InputContent />
          </InputBoxHook>
        </div>
        <div className="inputBoxAccessories"></div>
      </div>
    </div>
  );
}
