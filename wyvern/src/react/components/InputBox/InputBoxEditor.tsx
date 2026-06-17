import { useRef, useState } from "react";
import type { InputKeybind } from "./InputBox.types";

export default function InputBoxEditor({
  hook,
  bindings
}: {
  hook: React.Dispatch<React.SetStateAction<boolean>>;
  bindings?: InputKeybind[]
}) {
  const ref = useRef(null)
  const [empty, setEmpty] = useState(true);
  return (
    <div
      role="textbox"
      className="inputBoxEditor"

      onKeyDown={(e) => {

        // get the binding that matches (if successful)
        {
          const binding = bindings?.find(bind => {
            return (
              (bind.keyName === e.key) &&
              (e.ctrlKey === bind.control) &&
              (e.shiftKey === bind.shift)
            )
          })
          if (binding) {
            e.preventDefault(); // prevent the keybind going through
            // call the matched keybind
            binding?.callback(ref)
            return
          }
        }

        // prevent user from hitting backspace when textbox is empty
        if (!empty) return;
        if (e.key === "Backspace" || e.key === "Delete") {
          e.preventDefault()
          setEmpty(true)
        }
      }}

      onInput={(e) => {
        // -- this works fine, error accessing innerText when in browser it works
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (e.target.innerText === "\n") {
          setEmpty(true)
          hook(false);
          return;
        }

        if (empty) {
          setEmpty(false)
        }

        hook(true);

      }}
      contentEditable
      ref={ref}
      />
  );
}
