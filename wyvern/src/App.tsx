import "./App.css";
import PanelHeader from "./react/components/ChannelOverhead";
import FlexBox from "./react/components/Flex";
import LSidePane from "./react/ui-sections/LSidePane";
import MainPanel from "./react/ui-sections/MainPanel";
import ChannelSelect from "./react/wyvern-comps/ChannelSelector";
// import { userData } from "./scripts/client/Client";
export function App() {
  return (
    <div className="appContent">
      <div id="titleBar">
      {/*Username: {userData.username} | DisplayName: {userData.display_name} | id: {userData.user_id}*/}
      </div>
      <div id="lSidePanel">
        <nav id="guilds"></nav>
        <div id="channelSelector">
          <FlexBox direction="updown" className="fillAll">
            <PanelHeader>
              <div className="fillAll panelHeaderInner">
                <div className="flexHoriz centerVert centerHori fillAll">
                  <div style={{
                    marginRight: "auto"
                  }}>
                    <header>
                      | Server Name |
                    </header>
                  </div>
                  <div>
                    dropdown - \/
                  </div>
                </div>
              </div>
            </PanelHeader>
            <LSidePane>
              channels
            </LSidePane>
          </FlexBox>
        </div>
      </div>
      <MainPanel></MainPanel>
    </div>
  );
}
