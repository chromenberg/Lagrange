import type { Props } from "../../Core";

export default function ScrollContainer({ children, className }: Props) {
  return <div className={` ${className??""}`}>{children}</div>
}