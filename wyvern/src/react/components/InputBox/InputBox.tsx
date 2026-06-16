import { useState } from "react";
import "../../styles/InputBox.css"
import PlaceholderText from "../PlaceholderText/PlaceholderText";
import InputBoxEditor from "./InputBoxEditor";

type InputBoxProps = {
  placeholder: string,
  charmLeft?: React.ReactNode
  charmRight?: React.ReactNode
  height?: string
}

// this is the BASE input box that everything should go off of
// but for now just making it a full thing is fine
export default function InputBox({placeholder, charmLeft, charmRight, height, ...rest}: InputBoxProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputState, setInputState] = useState(false);
  
  return (
    <div className="inputBoxWrapper">
      <div className="inputInnerContainer">
        {charmLeft}
        
        <div className="inputBoxContent">
          <PlaceholderText isActive={inputState}>
            {placeholder}
          </PlaceholderText>
          <InputBoxEditor hook={setInputState} />
        </div>

        {charmRight}
      </div>
    </div>
  );
}
// function MessageBarContentNode({ slateNode, children }: {slateNode: string, children?: React.ReactNode }) {
//   return <div data-slate-node={slateNode}>{children}</div>
// }
