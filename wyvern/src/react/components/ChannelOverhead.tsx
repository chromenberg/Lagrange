import type { Props } from "../../Core";
import("./ChannelOverhead.css");

export default function PanelHeader({children}: Partial<Props>) {
  return <div className="panelHeader">{children}</div>;
}
