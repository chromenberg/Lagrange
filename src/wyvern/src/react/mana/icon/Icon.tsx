import type { IconProps } from "../../../scripts/types/Button";


export default function Icon({ children, width, height, viewbox }: IconProps) {
  const minX = viewbox?.minX ?? "0";
  const minY = viewbox?.minY ?? "0";
  const viewboxWidth = viewbox?.width ?? width;
  const viewboxHeight = viewbox?.height ?? height;

  return (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox={`${minX} ${minY} ${viewboxWidth} ${viewboxHeight}`}
    >
      {children}
    </svg>
  );
}
