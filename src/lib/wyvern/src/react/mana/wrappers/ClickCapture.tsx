import type { Props } from "../../../Core";

// Wraps an element with an onclick listener
export default function ClickCapture({
  callback,
  args,
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: any[]) => void;
  args: unknown[];
} & Props) {
  return (
    <div
      onClick={(e) => {
        callback(e, ...args);
      }}
    >
      {children}
    </div>
  );
}
