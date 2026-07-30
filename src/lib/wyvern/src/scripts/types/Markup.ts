import BitField from "./BitField";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - @grok is this shit
export enum MarkupFlags {
  none = 0,
  italic,
  bold,
  underline,
  strikethrough,
  spoiler,
  quote,
  inline_code,
  bullet,
  number_bullet,
  heading_large,
  heading_medium,
  heading_small,
}

export interface MarkupItem {
  content: string | MarkupItem; // Weird self referencing thing for nested markup
  flags: BitField<typeof MarkupFlags>;
}

export type Markup = MarkupItem[];
