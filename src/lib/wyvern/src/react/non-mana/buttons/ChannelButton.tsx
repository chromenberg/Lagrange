const useCurrentRoute = (
  await import("../../../scripts/stores/current-store/CurrentStore")
).useCurrentRoute;
const LinkTo = (await import("../links/LinkTo")).default;

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

  return (
    <div className="interactableItem">
      <LinkTo guild={location.guild.id ?? "@me"} channel={id}>
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
