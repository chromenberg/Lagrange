import type { Props } from "../../Core";
import FlexBox from "../components/Flex";
import "../styles/LPane.css";
export default function LSidePane({ children }: Props) {
  return (
    <div className="lPane">
      <FlexBox direction="updown" center="horizontal">{children}</FlexBox>
    </div>
  );
}
