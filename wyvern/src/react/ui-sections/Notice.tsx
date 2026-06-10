import type { ColoredButtonType, Props } from "../../Core";
import { NoticeButton } from "../wyvern-comps/Buttons";
import "../styles/Notice.css"
import FlexBox from "../components/Flex";

export type PropsWithButtons = {
  buttons: ColoredButtonType[];
} & Props;

export default function Notice({
  children,
  buttons,
}: PropsWithButtons) {
  return (
    <div className="noticeContainer">
      <FlexBox direction="leftright">
        {/* Children should always come first */}
        {/* Then buttons */}
        {children}
        {buttons?.map(button => {
          return <NoticeButton {...button}/>
        })}
      </FlexBox>
    </div>
  );
}
