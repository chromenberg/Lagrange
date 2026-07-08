// import { useCurrentRoute } from "../../../scripts/stores/current-store/CurrentStore";
import ScrollMenu from "../../mana/scroll-menu/ScrollMenu";
import ChannelCreator from "../channel/ChannelCreator";

export default function ChannelBar() {
  // const location = useCurrentRoute();

  return (
    <ScrollMenu direction="vertical">
      <div className="channelBar">
        <ChannelCreator
          // guild_id={location ? (location.guild.id ?? "@me") : "@me"}
        />
      </div>
    </ScrollMenu>
  );
}
