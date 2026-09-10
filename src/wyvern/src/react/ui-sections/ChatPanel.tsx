// const useContext = (await import("react")).useContext;
// import { createMarkupItem } from "../../scripts/core/Markup";
import ScrollMenu from "../mana/scroll-menu/ScrollMenu";
import MessageBox from "../mana/input-box/message/MessageBox";

// const UserContext = (await import("../../scripts/client/UserContext")).default;
import("../styles/ChatPanel.css");

export default function ChatPanel() {
 
  return (
    <main className="chatPanel">
      <div className="flexHoriz fillAll">
        <div className="fillAll flexVert">
          <div data-fill className="chatScrollContainer">
            <div data-fill className="chatScrollInner">
              <ScrollMenu direction="vertical" align="start">
                <ul className="container_channelContent">
                </ul>
              </ScrollMenu>
            </div>
          </div>
          <form>
            <div className="chatInputContainer">
              {/*<InputBox
                placeholder={"Message "}
                charmLeft={leftCharms}
                charmRight={rightCharms}
                keybinds={[sendMessage]}
              ></InputBox>*/}
              <MessageBox />
            </div>
          </form>
        </div>
        <div className="sidePanel">
        </div>
      </div>
    </main>
  );
}
