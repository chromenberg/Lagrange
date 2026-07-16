import InvokeModal from "../../mana/wrappers/InvokeModal";
export default function GuildCreateButton() {
  return (
    <div className="guildBarIcon" data-rounding="full">
      <InvokeModal>
        <div className="guildIconContainer">+</div>
      </InvokeModal>
    </div>
  );
}
