import ChannelButton from "../channel/ChannelButton";

type A = {
  name: string;
  id: string;
  type: "text" | "voice";
};

function mapChannel({name, id}: A) {
  return <ChannelButton name={name} id={id}/>
}

export default function ChannelMapper({ data }: { data: A[] }) {
  return <>{data.map((channel) => {
    return mapChannel(channel)
  })}</>;
}
