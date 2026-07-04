const NavLink = (await import("react-router")).NavLink;
import type { Props } from "../../../Core";

export default function LinkTo({
  guild,
  channel,
  children,
}: Props & { guild: string; channel: string }) {
  return <NavLink to={`/channels/${guild}/${channel}`}>{children}</NavLink>;
}
