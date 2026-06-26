import UserContext from "./scripts/client/UserContext";

import("./App.css");
const PanelHeader = (await import("./react/components/ChannelOverhead")).default;
const FlexBox = (await import("./react/components/Flex")).default;
const LSidePane = (await import("./react/ui-sections/LSidePane")).default;
const MainPanel = (await import("./react/ui-sections/MainPanel")).default;
const CreateGuildModal = (await import("./react/modals/GuildCreate")).default;
// import ChannelSelect from "./react/wyvern-comps/ChannelSelector";
// import { userData } from "./scripts/client/Client";
export function App() {
  return (<>
    <UserContext.Provider value={}>
      
    </UserContext.Provider>
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
      {/*<CreateGuildModal />*/}
    </div>
    <CreateGuildModal/>
    {/*<div id="modal-portal"></div>*/}
  </>
  );
}
