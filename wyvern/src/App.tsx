import "./App.css";
import ChannelHeader from "./components/ChannelOverhead";
import MainPanel from "./components/MainPanel";
export function App() {
  return (
    <div className="appContent">
      <div id="titleBar"></div>
      <div id="lSidePanel">
        <nav id="guilds">fdgsdfg</nav>
        <div id="channelSelector">
          <ChannelHeader></ChannelHeader>
        </div>
        <MainPanel></MainPanel>
      </div>
    </div>
  );
}
