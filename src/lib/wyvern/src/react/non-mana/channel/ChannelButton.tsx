import { NavLink } from "react-router";

const routes = (await import("../../../scripts/client/Routes")).routes;
const populate = (await import("../../../scripts/core/SetPlaceholders"))
  .populate;
import("../../styles/InteractableItem.css");
import("../../styles/ChannelBar.css")
export default function ChannelButton({
  name,
  id,
}: {
  name: string;
  id: string;
}) {
  return (
    <div className="interactableItem">
      <NavLink
        to={populate(routes.channels, id)}
        state={{
          guild: {
            id: "guild id placeholder",
            name: "guild name placeholder",
          },
          channel: {
            id: id,
            name: name,
            type: "Text",
          },
        }}
        className="channelLink"
      >
        <div className="interactWrapper">
          <div className="channelIconContainer" mana-type="svg-container"></div>
          <div className="channelTextContainer">{name}</div>
        </div>
      </NavLink>
    </div>
  );
}
