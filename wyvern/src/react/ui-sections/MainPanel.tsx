import PanelHeader from "../components/ChannelOverhead";
import FlexBox from "../components/Flex";
import "../styles/MainPanel.css"
import ChatPanel from "./ChatPanel";


export default function MainPanel() {
  return (
    // sets this panel to exist in the page content
    <div className="mainPanelWrapper">
      <FlexBox direction="updown">
        <PanelHeader></PanelHeader>
        <FlexBox direction="leftright" className="mainContent">
          <ChatPanel />
        </FlexBox>
      </FlexBox>
    </div>
      
  );
}
