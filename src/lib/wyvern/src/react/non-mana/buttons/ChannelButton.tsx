import { setLastOpenedChannel } from "../../../scripts/stores/last-opened-channel-store/LastChannelStore";

const LinkTo = (await import("../links/LinkTo")).default;
import("../../styles/InteractableItem.css")
type ChannelButtonData = {
  channel: { name: string, id: string },
  guild: { name: string, id: string }
};

export default function ChannelButton({
  channel,
  guild
}: ChannelButtonData) {

  const updateLastOpenedChannel = () => {
    setLastOpenedChannel(guild.id, channel.id)
    console.log("[Routing/Store] Updating last opened channel to",channel.id)
  }
  
  return (
    <div className="interactableItem">
      <LinkTo guild={guild} channel={channel} className="active">
        <div className="interactWrapper" onClick={updateLastOpenedChannel}>
          <div className="channelIconContainer" mana-type="svg-container"></div>
          <div className="channelTextContainer">
            {channel.name}
          </div>
        </div>
      </LinkTo>
    </div>
  );
}
