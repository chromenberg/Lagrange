// const useContext = (await import("react")).useContext;
// import { createMarkupItem } from "../../scripts/core/Markup";
import ScrollMenu from "../mana/scroll-menu/ScrollMenu";
import MessageBox from "../mana/input-box/message/MessageBox";
import AvatarPile from "../mana/pile/avatar/AvatarPile";

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
          <AvatarPile overlap="small" clipOverlap="medium" height="large" users={["126400386083856384","126400386083856384","126400386083856384","126400386083856384","126400386083856384"]} />
        </div>
      </div>
    </main>
  );
}
