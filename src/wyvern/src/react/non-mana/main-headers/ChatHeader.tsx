import SearchBox from "../../mana/input-box/search/SearchBox";
import Stack from "../../mana/stack/Stack";
import ChannelName from "../channel/ChannelName";
import FlexDiv from "../flex-items/FlexDiv";

export default function ChatHeader() {
  return (
    <div className="fillAll panelHeaderInner">
      <div className="flexHoriz centerVert fillAll">
        <Stack align="center" fillAll>
          <div className="chatHeader">
            
          <b>#<ChannelName /></b>
          </div>
          <aside className="sidePanelSizing sidePanelHeader">
            <SearchBox />
          </aside>
  
        </Stack>
      </div>
    </div>
  )
}