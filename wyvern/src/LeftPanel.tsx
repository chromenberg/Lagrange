// import { useEffect } from "react";
import ScrollMenu from "./react/mana/scroll-menu/ScrollMenu";
const ChannelMapper = (await import("./react/non-mana/channel-mapper/Mapper"))
  .default;
// import useToken from "./scripts/client/requests/Authorization";
// import { getGuildChannels } from "./scripts/client/requests/GetGuildChannels";
// import ChannelButton from "./react/non-mana/channel/ChannelButton";

const PanelHeader = (await import("./react/components/ChannelOverhead"))
  .default;
const FlexBox = (await import("./react/components/Flex")).default;
const LSidePane = (await import("./react/ui-sections/LSidePane")).default;
import("./react/styles/ChannelBar.css");
  const data = [
    {
      id: "127238068460609536",
      name: "general",
      index: "0",
      type: "text",
    },
    {
      id: "127238068477386752",
      name: "off-topic",
      index: "1",
      type: "text",
    },
  ];

export default function LeftPanel() {
  // const token = useToken()
  return (
    <div id="lSidePanel">
      <nav id="guilds">
        {/*<ScrollMenu>

        </ScrollMenu>*/}
      </nav>
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
