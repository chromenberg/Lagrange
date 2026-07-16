import { Suspense } from "react";
import GuildListCreator from "./react/non-mana/guild/GuildCreator";
import ChannelBar from "./react/non-mana/channel-bar/ChannelBar";

// import { useEffect } from "react";
// const ScrollMenu = (await import("./react/mana/scroll-menu/ScrollMenu"))
//   .default;
// const ChannelCreator = (await import("./react/non-mana/channel/ChannelCreator"))
//   .default;
const useCurrentRoute = (
  await import("./scripts/stores/current-store/CurrentStore")
).useCurrentRoute;

const PanelHeader = (await import("./react/components/ChannelOverhead"))
  .default;
const FlexBox = (await import("./react/components/Flex")).default;
import("./react/styles/ChannelBar.css");
import("./react/styles/GuildsBar.css");
export default function LeftPanel() {
  // const token = useToken()
  const location = useCurrentRoute();

  return (
    <div id="lSidePanel">
      <nav id="guilds">
        <Suspense>
          <GuildListCreator />
        </Suspense>
      </nav>
      <div id="channelSelector">
        <FlexBox direction="updown" className="fillAll">
          <PanelHeader>
            <div className="fillAll panelHeaderInner">
              <div className="flexHoriz centerVert centerHori fillAll">{location.guild.name}</div>
            </div>
          </PanelHeader>
          <div className="lPane">
            <FlexBox direction="updown" center="horizontal">
              <ChannelBar />
            </FlexBox>
          </div>
        </FlexBox>
      </div>
    </div>
  );
}
