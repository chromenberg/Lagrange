import type { Props } from "../../Core";
const FlexBox = (await import("../components/Flex")).default;
import("../styles/LPane.css");
export default function LSidePane({ children }: Props) {
  return (
    <div className="lPane">
      <FlexBox direction="updown" center="horizontal">{children}</FlexBox>
    </div>
  );
}
