const LinkTo = (await import("../links/LinkTo")).default;
import("../../styles/InteractableItem.css")
type ChannelButtonData = {
  channel: { name: string, id: string },
  guild: { name: string, id: string }
};

export default function ChannelButton({
  channel,
  guild
  // type,
}: ChannelButtonData) {
  return (
    <div className="interactableItem">
      <LinkTo guild={guild} channel={channel}>
        <div className="interactWrapper">
          <div className="channelIconContainer" mana-type="svg-container"></div>
          <div className="channelTextContainer">
            {channel.name}
          </div>
        </div>
      </LinkTo>
    </div>
  );
}
