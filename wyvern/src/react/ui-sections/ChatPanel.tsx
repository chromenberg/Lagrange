// import { useState } from "react";
// import FlexBox from "../components/Flex";
import "../styles/ChatPanel.css";
// import Button from "../test/Button";
// import { Stack } from "../test/Stack";
import InputBox from "../components/InputBox/InputBox";
import InputBoxAccessories from "../components/InputBox/InputBoxAccessories";
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
            style={{ flex: "1 1 auto", background: "var(--theme-highest)" }}
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
              ></InputBox>
            </form>
          </section>
        </div>
        <div style={{ width: "100px" }}></div>
      </div>
    </main>
  );
}
