const NavLink = (await import("react-router")).NavLink;
import type { Props } from "../../../Core";

export default function LinkTo({
  guild,
  channel,
  children,
  className,
}: Props & {
  guild: { id: string | null; name: string };
  channel: { id: string; name: string };
}) {
  console.log("ddsf", guild, channel);
  return (
    <NavLink
      to={`/channels/${guild.id ?? "@me"}/${channel.id}`}
      className={className}
      state={{
        guild,
        channel,
      }}
    >
      {children}
    </NavLink>
  );
}
