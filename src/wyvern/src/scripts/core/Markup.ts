import BitField from "../types/BitField";
import { MarkupFlags, type Markup, type MarkupItem } from "../types/Markup";

export function markupFlags(flags: Array<keyof typeof MarkupFlags>) {
  const markupFlags = new BitField(
    MarkupFlags,
    12 /* Weird hardcoded thing thats prone to alignment */,
  );

  // Loop through each flag and set its value to true
  flags.forEach((flag) => {
    markupFlags.set(flag, true);
  });

  return markupFlags;
}

/**
 * Creates a markup item from a text content or a nested markup item
 *
 * Allows for defining the markup flags with an array of names, much easier than
 * creating a new bitfield every time, increases consistency and reduces redundancy
 * @param content
 * @param flags
 * @returns
 */
export function createMarkupItem(
  content: string | Markup,
  flags: Array<keyof typeof MarkupFlags>,
): MarkupItem {
  return {
    content,
    flags: markupFlags(flags),
  };
}

/*
Markup should be stored as follows

[
  {
    "content": {
      "content": {}
    },
    "flags": ["quote"]
  },
]
*/

const markupRules = {
  bold: {
    priority: 0,
    rule: /\*\*(.+?)\*\*(?!\*)/gm,
    sub: "<b>$1</b>",
  },
  italic: {
    priority: 1,
    rule: /\*(.+?)\*(?!\*)/gm,
    sub: "<i>$1</i>",
  },
};

export class MarkupText {
  private text: string;
  constructor(text: string) {
    this.text = text;
  }

  public match() {
    Object.values(markupRules).forEach((rule) => {
      this.text = this.text.replace(rule.rule, rule.sub);
    });
    return this.text
  }
}
