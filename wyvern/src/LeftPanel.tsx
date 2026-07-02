import ScrollMenu from "./react/mana/scroll-menu/ScrollMenu";
import ChannelMapper from "./react/non-mana/channel-mapper/Mapper";
// import ChannelButton from "./react/non-mana/channel/ChannelButton";

const PanelHeader = (await import("./react/components/ChannelOverhead"))
  .default;
const FlexBox = (await import("./react/components/Flex")).default;
const LSidePane = (await import("./react/ui-sections/LSidePane")).default;
import("./react/styles/ChannelBar.css")

const data:  {
  name: string;
  id: string;
  type: "text" | "voice";
  }[] = [
  {
    name: "general",
    id: "1231231",
    type: "text"
  },
  {
    name: "general2",
    id: "12354671",
    type: "text"
  },
  {
    name: "general5",
    id: "16456256",
    type: "text"
  } 
  
]

export default function LeftPanel() {
  return (
    <div id="lSidePanel">
      <nav id="guilds"></nav>
      <div id="channelSelector">
        <FlexBox direction="updown" className="fillAll">
          <PanelHeader>
            <div className="fillAll panelHeaderInner">
              <div className="flexHoriz centerVert centerHori fillAll"></div>
            </div>
          </PanelHeader>
          <LSidePane>
            <ScrollMenu>
              <div className="channelBar">
                <ChannelMapper data={data} />
              </div>
            </ScrollMenu>
          </LSidePane>
        </FlexBox>
      </div>
    </div>
  );
}
