const PanelHeader = (await import("../components/ChannelOverhead")).default;
const FlexBox = (await import("../components/Flex")).default;
const InputBox = (await import("../components/InputBox/InputBox")).default;
const ChatPanel = (await import("./ChatPanel")).default;
import("../styles/MainPanel.css");

export default function MainPanel() {
  return (
    // sets this panel to exist in the page content
    <div className="mainPanelWrapper">
      <FlexBox direction="updown">
        <PanelHeader>
          <div className="fillAll panelHeaderInner">
            <div className="flexHoriz centerVert fillAll">
              <div
                style={{
                  marginRight: "auto",
                }}
              >
                <b>[#ChannelName]</b> - <small>description</small>
              </div>
              <div
                style={{
                  width: "100px",
                }}
              >
                <InputBox height="10px" placeholder="Search"></InputBox>
              </div>
            </div>
          </div>
        </PanelHeader>
        <FlexBox direction="leftright" className="mainContent">
          <ChatPanel />
        </FlexBox>
      </FlexBox>
    </div>
  );
}
