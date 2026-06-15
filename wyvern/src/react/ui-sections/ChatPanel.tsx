// import { useState } from "react";
// import FlexBox from "../components/Flex";
import "../styles/ChatPanel.css";
// import Button from "../test/Button";
// import { Stack } from "../test/Stack";
import InputBox from "../test/InputBox";

export default function ChatPanel() {
  // const [state, setState] = useState(1)
  return (
    <main className="chatPanel">
      {/*<Stack gap="med">*/}
        {/*<FlexBox direction="leftright">*/}
          {/*<Button name="primary button" type="primary" />*/}
          {/*<Button name="secondary button" type="secondary" />*/}
          {/*<Button name="tertiary button" type="tertiary" />*/}
        {/*</FlexBox>*/}
        {/*<FlexBox direction="leftright" center="both">*/}
          {/*<div>count: </div><div>{state}</div>*/}
        {/*</FlexBox>*/}
      {/*</Stack>*/}
      <div id="test">
        <br></br>
        <h2>Input Testing</h2>
        <div id="debugoutput"></div>
  
        {/* Should be the BASE input box */}
        <InputBox></InputBox>
        
      </div>
    </main>
  );
}
