import ChannelName from "../channel/ChannelName";
import FlexDiv from "../flex-items/FlexDiv";

export default function ChatHeader() {
  return (
    <div className="fillAll panelHeaderInner">
      <div className="flexHoriz centerVert fillAll">
        <FlexDiv right>
          <b>#<ChannelName/></b>
        </FlexDiv>
      </div>
    </div>
  )
}