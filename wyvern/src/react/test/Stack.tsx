import type { Props } from "../../Core";
import FlexBox from "../components/Flex";
import "./Stack.css";
const GapSize = {
  xSmall: "XS",
  small: "SM",
  med: "M",
  large: "L",
  xLarge: "XL",
};

function parseGap(gap?: keyof typeof GapSize): string {
  if (!gap) return "";
  return "gap" + GapSize[gap];
}
function StackItem({ children }: Props) {
  return (
    <div className="stackItem">
      <FlexBox direction="leftright">{children}</FlexBox>
    </div>
  );
}
export function Stack({
  children,
  gap,
}: Props & { gap?: keyof typeof GapSize }) {
  return (
    <FlexBox direction="updown" className={parseGap(gap)}>
      {
        //@ts-ignore
        children?.map((item) => {
        return <StackItem>{item}</StackItem>;
      })}
    </FlexBox>
  );
}
