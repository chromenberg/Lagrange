import { useState } from "react";
import type { InputBoxProps } from "./InputBox.types";
const PlaceholderText = (await import("../PlaceholderText/PlaceholderText")).default;
const InputBoxEditor = (await import("./InputBoxEditor")).default;

import("../../styles/InputBox.css")


// this is the BASE input box that everything should go off of
// but for now just making it a full thing is fine
export default function InputBox({ placeholder, charmLeft, charmRight, keybinds, ...rest }: InputBoxProps) {
  const [inputState, setInputState] = useState(false);
  
  return (
    <div className="inputBoxWrapper" {...rest}>
      <div className="inputInnerContainer">
        {charmLeft}
        
        <div className="inputBoxContent">
          <PlaceholderText isActive={inputState}>
            {placeholder}
          </PlaceholderText>
          {/* Prop Drilling, should be using a state, but its not that bad */}
          <InputBoxEditor hook={setInputState} bindings={keybinds} />
        </div>

        {charmRight}
      </div>
    </div>
  );
}
// function MessageBarContentNode({ slateNode, children }: {slateNode: string, children?: React.ReactNode }) {
//   return <div data-slate-node={slateNode}>{children}</div>
// }
