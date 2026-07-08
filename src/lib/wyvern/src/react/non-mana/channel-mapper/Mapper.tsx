// import { routes } from "../../../scripts/client/Routes";
// import useGuildStore from "../../../scripts/stores/guild-store/GuildStore";
// import useToken from "../../../scripts/client/requests/Authorization";
// import { getGuildChannels } from "../../../scripts/client/requests/GetGuildChannels";
import ChannelButton from "../channel/ChannelButton";

type A = {
  name: string;
  id: string;
  index: string
  type: string
};

function mapChannel({ name, id }: A) {
  return <ChannelButton key={id} name={name} id={id} />;
}

export default function ChannelMapper({
  data,
}: {
  data: A[];
}) {
  
  return (
    <>
      {data.map((channel) => {
        console.log("dfgsdfg");
        return mapChannel(channel);
      })}
    </>
  );
}
