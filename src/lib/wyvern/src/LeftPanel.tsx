import { Suspense, useState } from "react";
import GuildListCreator from "./react/non-mana/guild/GuildCreator";
import ChannelBar from "./react/non-mana/channel-bar/ChannelBar";
// import SettingsModal from "./react/layers/modals/settings/Settings";
import useUserInfo from "./scripts/stores/user-store/UserStore";
import UserContext from "./scripts/hooks/UserContext";

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
const lazy = (await import("react")).lazy;
const SettingsModal = lazy(
  () => import("./react/layers/modals/settings/Settings"),
);
function UserCard() {
  const [show, setShow] = useState(false);
  // FIX: temporary solution
  const userInfo = useUserInfo();

  return (
    <>
      <UserContext.Provider value={userInfo}>
        <section
          className="userCard"
          onClick={() => {
            setShow(true);
          }}
        ></section>
        {/* FIX: temporary solution */}
        {show && <SettingsModal key="settings" state={setShow} />}
      </UserContext.Provider>
    </>
  );
}
function GuildListCreator() {
  return (
    <nav id="guilds">
      <Suspense>
        <GuildListCreator />
      </Suspense>
    </nav>
  );
}

function ChannelPanelCreator() {
  const location = useCurrentRoute();
  return (
    <div id="channelSelector">
      <FlexBox direction="updown" className="fillAll">
        <PanelHeader>
          <div className="fillAll panelHeaderInner">
            <div className="flexHoriz centerVert centerHori fillAll">
              {location.guild.name}
            </div>
          </div>
        </PanelHeader>
        <div className="lPane">
          <FlexBox direction="updown" center="horizontal">
            <ChannelBar />
          </FlexBox>
        </div>
      </FlexBox>
    </div>
  );
}

export default function LeftPanel() {
  // const token = useToken()

  return (
    <div id="lSidePanel">
      <GuildListCreator />
      <UserCard />
      <ChannelPanelCreator />
    </div>
  );
}
