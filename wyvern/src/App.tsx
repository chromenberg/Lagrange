import { BrowserRouter } from "react-router";
import ClientWrapper from "./scripts/client/Client";
import LeftPanel from "./LeftPanel";

import("./App.css");

const MainPanel = (await import("./react/ui-sections/MainPanel")).default;
const CreateGuildModal = (await import("./react/modals/GuildCreate")).default;
// import ChannelSelect from "./react/wyvern-comps/ChannelSelector";
// import { userData } from "./scripts/client/Client";
export function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <ClientWrapper>
          <div className="appContent">
            <div id="titleBar">
              {/*Username: {userData.username} | DisplayName: {userData.display_name} | id: {userData.user_id}*/}
            </div>
            <LeftPanel />
            <MainPanel></MainPanel>
            {/*<CreateGuildModal />*/}
          </div>
          <CreateGuildModal />
          {/*<div id="modal-portal"></div>*/}
        </ClientWrapper>
      </BrowserRouter>
    </>
  );
}
