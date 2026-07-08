const NavLink = (await import("react-router")).NavLink;
import type { Props } from "../../../Core";

export default function LinkTo({
  guild,
  channel,
  children,
  className,
}: Props & {
  guild: { id: string; name: string };
  channel: { id: string; name: string };
}) {
  return (
    <NavLink
      to={`/channels/${guild.id}/${channel.id}`}
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
