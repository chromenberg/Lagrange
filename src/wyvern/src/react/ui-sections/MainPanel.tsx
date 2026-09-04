const ChatHeader = (await import("../non-mana/main-headers/ChatHeader")).default;

const PanelHeader = (await import("../components/ChannelOverhead")).default;
const FlexBox = (await import("../components/Flex")).default;
const ChatPanel = (await import("./ChatPanel")).default;
import("../styles/MainPanel.css");

export default function MainPanel() {
  return (
    // sets this panel to exist in the page content
    <div className="mainPanelWrapper">
      <FlexBox direction="updown">
        <PanelHeader>
          <ChatHeader />
        </PanelHeader>
        <FlexBox direction="leftright" className="mainContent">
          <ChatPanel />
        </FlexBox>
      </FlexBox>
    </div>
  );
}
