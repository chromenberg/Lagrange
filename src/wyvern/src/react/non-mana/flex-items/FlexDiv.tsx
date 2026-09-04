import type { Props } from "../../../Core";
import("../../styles/FlexDiv.css")
type MarginTypes = {
  left?: boolean;
  right?: boolean;
};
export default function FlexDiv({
  left,
  children,
  right,
  className,
  ...rest
}: MarginTypes & Props) {
  const isLeft = () => {
    return left ? "autoLeft" : "";
  };
  const isRight = () => {
    return right ? "autoRight" : "";
  };
  return (
    <div className={`${isLeft} ${isRight} ` + className} {...rest}>
      {children}
    </div>
  );
}
