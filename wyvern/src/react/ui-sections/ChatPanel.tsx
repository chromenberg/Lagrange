// import { useState } from "react";
// import FlexBox from "../components/Flex";
import("../styles/ChatPanel.css");
// import Button from "../test/Button";
// import { Stack } from "../test/Stack";
const InputBox = (await import("../components/InputBox/InputBox")).default;
const InputBoxAccessories = (await import("../components/InputBox/InputBoxAccessories")).default;
import type { InputKeybind } from "../components/InputBox/InputBox.types";
const rightCharms = (
  <InputBoxAccessories>
    <div>#</div>
    <div>#</div>
    <div>#</div>
    <div>#</div>
  </InputBoxAccessories>
);
const leftCharms = (
  <InputBoxAccessories>
    <div>+</div>
  </InputBoxAccessories>
);
const sendMessage: InputKeybind = {
  shift: true,
  control: false,
  keyName: "Enter",
  callback: (ref) => {
    console.log(ref)
  }
}
export default function ChatPanel() {
  // const [state, setState] = useState(1)
  return (
    <main className="chatPanel">
      <div className="flexHoriz fillAll">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
          }}
        >
          <div
            style={{ flex: "1 1 auto" }}
          ></div>
          <section
            style={{
              marginBlock: "7px",
              paddingBottom: "0px",
            }}
          >
            <form>
              <InputBox
                placeholder="Message #{name}"
                charmLeft={leftCharms}
                charmRight={rightCharms}
                keybinds={[sendMessage]}
              ></InputBox>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
