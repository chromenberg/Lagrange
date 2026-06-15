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
            <PanelHeader></PanelHeader>
            <LSidePane>
              <ChannelSelect
                channels={[
                  {
                    name: "general",
                    id: "2870986729480",
                  },
                  {
                    name: "general2",
                    id: "2870986234514",
                  },
                  {
                    name: "general3",
                    id: "287098623452345",
                  },
                  {
                    name: "general4",
                    id: "2870952323480",
                  },
                ]}
              />
            </LSidePane>
          </FlexBox>
        </div>
      </div>
      <MainPanel></MainPanel>
    </div>
  );
}
