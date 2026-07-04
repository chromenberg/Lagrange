import useGuildStore from "./scripts/stores/guild-store/GuildStore";

// import { useEffect } from "react";
const ScrollMenu = (await import("./react/mana/scroll-menu/ScrollMenu"))
  .default;
const ChannelCreator = (await import("./react/non-mana/channel/ChannelCreator"))
  .default;
const useCurrentRoute = (
  await import("./scripts/stores/current-store/CurrentStore")
).useCurrentRoute;

const PanelHeader = (await import("./react/components/ChannelOverhead"))
  .default;
const FlexBox = (await import("./react/components/Flex")).default;
import("./react/styles/ChannelBar.css");

export default function LeftPanel() {
  // const token = useToken()
  const location = useCurrentRoute();
  console.log(useGuildStore())
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
          <div className="lPane">
            <FlexBox direction="updown" center="horizontal">
              <ScrollMenu>
                <div className="channelBar">
                  <ChannelCreator guild_id={location ? location.guild.id ?? "@me" : "@me"} />
                </div>
              </ScrollMenu>
            </FlexBox>
          </div>
        </FlexBox>
      </div>
    </div>
  );
}
