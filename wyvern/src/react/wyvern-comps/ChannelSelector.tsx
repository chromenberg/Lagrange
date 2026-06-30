const FlexBox = (await import("../components/Flex")).default;
const HoverBackground = (await import("./HoverBackground")).default;

type ChannelInfo = {
  name: string;
  id: string;
  type?: number;
};
// TODO: make this a general purpose thing that creates elements from a list of data
// then make a general purpose "library" for all the elements that will be used for this
export default function ChannelSelect({
  channels,
}: {
  channels: ChannelInfo[];
}) {
  return (
    <FlexBox direction="updown" className="lPaneContent">
      {channels.map((channel) => {
        return (
          <HoverBackground>
            <a href={`http://localhost:80/channels/${channel.id}/`}>
              <FlexBox direction="leftright">
                <span>{channel.name}</span>
              </FlexBox>
            </a>
          </HoverBackground>
        );
      })}
    </FlexBox>
  );
}
