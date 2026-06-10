import FlexBox from "../components/Flex";

type ChannelInfo = {
  name: string;
  id: string;
  type?: number;
};

export default function ChannelSelect({
  channels,
}: {
  channels: ChannelInfo[];
}) {
  return (
    <FlexBox direction="updown">
      {channels.map((channel) => {
  
        return <a href={`http://localhost:80/channels/${channel.id}/`}><FlexBox direction="leftright">
          <span>{channel.name}</span>
        </FlexBox></a>;
      })}
    </FlexBox>
  );
}
