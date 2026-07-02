import("../../styles/InteractableItem.css")
export default function ChannelButton({
  name,
  id,
}: {
  name: string;
  id: string;
}) {
  return (
    <div className="interactableItem">
      {name} - {id}
    </div>
  );
}
