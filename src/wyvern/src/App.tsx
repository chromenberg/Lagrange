const BrowserRouter = (await import("react-router")).BrowserRouter;
const ClientWrapper = (await import("./scripts/client/Client")).default;
const LeftPanel = (await import("./LeftPanel")).default;
const TitleBar = (await import("./Title")).default;
const MainPanel = (await import("./react/ui-sections/MainPanel")).default;

import("./App.css");
export function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <ClientWrapper>
          <div className="appContent">
            <TitleBar />
            <LeftPanel />
            <MainPanel />
          </div>
          {/*<div id="modal-portal"></div>*/}
        </ClientWrapper>
      </BrowserRouter>
    </>
  );
}
