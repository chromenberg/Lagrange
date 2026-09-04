import type { Markup } from "../../../scripts/types/Markup";

function stripFormatting(content: Markup) {
  // recursion function in case we encounter any nested formatting
  function recurse(item: Markup) {
    item.forEach(sub_item => {
      if (typeof sub_item.content === "string") {
        return sub_item.content
      }
      return recurse(sub_item.content)
    })
  }
  // Traverse through every content item in the thing
   return recurse(content)
}

export default function MarkupText({content}: {content: Markup}) {
  console.log(stripFormatting(content))
}