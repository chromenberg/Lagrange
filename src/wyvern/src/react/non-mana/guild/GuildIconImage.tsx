const { GuildIconSize } = await import("../../../sizings/GuildSizings");
const { routes, attachments } = await import("../../../scripts/client/Routes");
const { populate } = await import("../../../scripts/core/SetPlaceholders");

interface GuildIconProps {
  icon_hash: string;
  id: string;
}

// https://cdn.discordapp.com/icons/<guild_id>/<icon_hash>.webp?size=80&quality=lossless
export default function GuildIconImage({ icon_hash, id }: GuildIconProps) {
  const iconURL =
     attachments + populate(routes.guild_icons, id, icon_hash) + ".jpg?size=64";
  return (
    <div className="iconImgContainer">
      <img src={iconURL} width={GuildIconSize} height={GuildIconSize}></img>
    </div>
  );
}
