const ScrollMenu = (await import("../../mana/scroll-menu/ScrollMenu")).default;
const ChannelCreator = (await import("../channel/ChannelCreator")).default;

export default function ChannelBar() {
  return (
    <ScrollMenu direction="vertical">
      <div className="channelBar">
        <ChannelCreator />
        
      </div>
    </ScrollMenu>
  );
}
