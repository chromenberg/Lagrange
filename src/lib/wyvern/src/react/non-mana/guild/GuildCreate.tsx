import InvokeModal from "../../mana/wrappers/InvokeModal";
import CreateGuildModal from "../../modals/GuildCreate";
export default function GuildCreateButton() {
  return (
    <div className="guildBarIcon" data-rounding="full">
      <InvokeModal modal={<CreateGuildModal />}>
        <div className="guildIconContainer">+</div>
      </InvokeModal>
    </div>
  );
}
