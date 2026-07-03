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

// function GuildButton({ id, name }) {
//   // const guilds = useGuildStore()

//   // return <div className="guildButton">
//   //   <NavLink to={}

//   //   </NavLink>
//   //   {guild.name.slice(4)}
//   // </div>
// }

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
// export function GuildMapper({ data }: { data: A[] }) {
//   return <>{data.map((guild) => {
//     return
//   })}</>;
// }
