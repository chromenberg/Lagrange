import { Icons } from "../../../../scripts/types/Icons";
import Icon from "../../icon/Icon";
import SlottedInputBox from "../slotted/SlottedInputBox";
import("./SearchBox.css")
const SearchIcon = Icons.search;

export default function SearchBox() {
  const icon = (
    <Icon
      width="16"
      height="16"
      viewbox={{ minX: "0", minY: "0", height: "24", width: "24" }}
    >
      <SearchIcon />
    </Icon>
  );

  const slots = {
    left: [{ children: icon }],
    right: [],
  };

  return <SlottedInputBox accessories={slots} className="searchBox">Search</SlottedInputBox>;
}
