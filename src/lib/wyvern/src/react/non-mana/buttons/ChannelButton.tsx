const useCurrentRoute = (
  await import("../../../scripts/stores/current-store/CurrentStore")
).useCurrentRoute;
const LinkTo = (await import("../links/LinkTo")).default;
import("../../styles/InteractableItem.css")
type ChannelButtonData = {
  name: string;
  id: string;
};

export default function ChannelButton({
  name,
  id
  // type,
}: ChannelButtonData) {
  const location = useCurrentRoute();

  const guild = {
    id: location.guild.id ?? "@me",
    name: location.guild.name ?? "@me"
  }
  const channel = {
    id: id,
    name: name
  }
  
  return (
    <div className="interactableItem">
      <LinkTo guild={guild} channel={channel}>
        <div className="interactWrapper">
          <div className="channelIconContainer" mana-type="svg-container"></div>
          <div className="channelTextContainer">
            {name}
          </div>
        </div>
      </LinkTo>
    </div>
  );
}
