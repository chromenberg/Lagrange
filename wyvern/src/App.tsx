import "./App.css";
import PanelHeader from "./react/components/ChannelOverhead";
import MainPanel from "./react/ui-sections/MainPanel";
import ChannelSelect from "./react/wyvern-comps/ChannelSelector";
export function App() {
  return (
    <div className="appContent">
      <div id="titleBar"></div>
      <div id="lSidePanel">
        <nav id="guilds"></nav>
        <div id="channelSelector">
          <PanelHeader></PanelHeader>
          <ChannelSelect channels={[{
            name: "general",
            id: "2870986729480"
          },
          {
            name: "general2",
            id: "2870986234514"
            },
            {
              name: "general3",
              id: "287098623452345"
            },
            {
              name: "general4",
              id: "2870952323480"
            }]} />
        </div>
      </div>
      <MainPanel></MainPanel>
    </div>
  );
}
