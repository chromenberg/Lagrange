export type Props = {
  children: React.ReactNode;
  className?: string | "";
  [rest: string]: unknown;
};
export type VoidCallback = (...args: unknown[]) => void;
// move to new file?
export type ButtonType = {
  name: string;
  callback: VoidCallback;
};
export type ColoredButtonType = ButtonType & {
  color: string;
  border: {
    width: string;
    color: string;
  };
};
