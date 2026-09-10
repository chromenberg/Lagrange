import type { Props } from "../../../Core";
import Stack from "../stack/Stack";
import("./PileItem"); 
import("./Pile.css");

type PileProps = {
  outerClass?: string;
  innerClass?: string;
} & Partial<Props>;



export default function Pile({ children, outerClass, innerClass }: PileProps) {
  return (
    <div mana-type="pile" className={outerClass}>
      <Stack fillAll align="center" className={innerClass}>
        {children}
      </Stack>
    </div>
  );
}
