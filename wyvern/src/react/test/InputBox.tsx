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
const ignoreKeys = ["Shift", "Control", "Alt", "Meta", "ContextMenu"]
const __tempContent: string[] = []

function setContentStore(key: string) {
  if (ignoreKeys.includes(key)) return;
  if (key === "Backspace") {
    __tempContent.pop()
  }
  else {
    if (key.length > 1) return;
    __tempContent.push(key)
  }
}
function isContent() {
  return (__tempContent.length>0)
}

// this is the BASE input box that everything should go off of
// but for now just making it a full thing is fine
export default function InputBox() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputState, setInputState] = useState(false);
  return (
    <div className="inputBoxWrapper">
      <div className="inputInnerContainer">
        <div className="inputBoxAccessories">#</div>
        <div className="separator" />
        <div className="inputBoxContent">
          <PlaceholderText isActive={inputState}>Send a message</PlaceholderText>
          <div className="inputBoxEditor" onKeyDown={(e) => {
            setContentStore(e.key);
            setInputState(isContent());
            console.log(e)
          }} contentEditable />
        </div>
        <div className="inputBoxAccessories"></div>
      </div>
    </div>
  );
}
// function MessageBarContentNode({ slateNode, children }: {slateNode: string, children?: React.ReactNode }) {
//   return <div data-slate-node={slateNode}>{children}</div>
// }
