import { BrowserRouter } from "react-router";
import ClientWrapper from "./scripts/client/Client";
import LeftPanel from "./LeftPanel";
import TitleBar from "./Title";

import("./App.css");

const MainPanel = (await import("./react/ui-sections/MainPanel")).default;
const CreateGuildModal = (await import("./react/modals/GuildCreate")).default;
export function App() {
return (
    <>
      <BrowserRouter basename="/">
        <ClientWrapper>
          <div className="appContent">
            <TitleBar />
            <LeftPanel />
            <MainPanel/ >
            {/*<CreateGuildModal />*/}
          </div>
          <CreateGuildModal />
          {/*<div id="modal-portal"></div>*/}
        </ClientWrapper>
      </BrowserRouter>
    </>
  );
}
