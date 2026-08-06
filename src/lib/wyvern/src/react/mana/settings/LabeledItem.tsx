import type { Props } from "../../../Core";
import btext from "../../../scripts/core/BooleanText";

interface LabeledProps extends Props {
  firstItemSpread?: boolean;
  flex?: boolean;
}

export default function Labeled({
  firstItemSpread,
  flex,
  children,
}: LabeledProps) {
  // Conditionally return the class name based off if the following
  // paramerters are true
  const flexData = btext(flex ?? true, "flexleftright");
  const spreadData = btext(firstItemSpread ?? false, "labelSpread");
  
  return (
    <div className={`${flexData} ${spreadData} labeledComponent`}>
      {children}
    </div>
  );
}
