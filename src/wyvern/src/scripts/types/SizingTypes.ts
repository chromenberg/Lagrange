export type SizingName = "xsmall" | "small" | "medium" | "large" | "xlarge";
export type Direction = "horizontal" | "vertical";
export type Thickness = "vthin" | "thin" | "thick" | "vthick";
export type StyleLevel = "primary" | "secondary" | "tertiary";
export type BorderStyle =
  "subtle" | "strong" | "darken" | "lighten" | StyleLevel;
export type ColoringStyles =
  | "danger"
  | "success"
  | StyleLevel
  | "profile-primary"
  | "profile-secondary"
  | "profile-tertiary"
  | "neutral";
export type SurfaceStyles = `${ColoringStyles}-surface`;
export type AllColoringStyles = ColoringStyles | SurfaceStyles;
