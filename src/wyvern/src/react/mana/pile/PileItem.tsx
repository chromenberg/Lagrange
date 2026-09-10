import type { Props } from "../../../Core";

export default function PileItem({ children }: Partial<Props>) {
  return <div mana-type="pile-item">
    {children}
  </div>
}