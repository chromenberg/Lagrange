import { useState } from "react";

export default function InputBoxEditor({
  hook,
}: {
  hook: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const ref = useRef(null)
  const [empty, setEmpty] = useState(true);

  return (
    <div
      role="textbox"
      className="inputBoxEditor"
      
      onKeyDown={(e) => {
        // prevent user from hitting backspace when textbox is empty
        if (!empty) return
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
      />
  );
}