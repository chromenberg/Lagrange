import type { Props } from "../../Core";
import type { AllColoringStyles, BorderStyle, SizingName } from "./SizingTypes";
import type { MouseEvent, ReactNode } from "react";
export interface InteractiveProps {
  style?: "subtle" | "overlay" | "menu"
}
export interface BaseButtonProps extends Props {
  callback: (ev: MouseEvent, ...args: unknown[]) => void;
  manaType?: string;
}
export interface ManaTextButtonProps extends BaseButtonProps {
  height?: SizingName;
}
export interface ManaHybridButtonProps extends ManaTextButtonProps {
  s: string;
}
export type ManaIconButtonProps = {
  size?: SizingName;
 
} & InteractiveProps & BaseButtonProps
export interface IconProps {
  children: ReactNode;
  width: string;
  height: string;
  viewbox?: {
    minX?: string;
    minY?: string;
    width?: string;
    height?: string;
  };
}