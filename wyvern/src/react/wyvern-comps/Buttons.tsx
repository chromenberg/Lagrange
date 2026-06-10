import Button from "../components/Button";
import type { ButtonType } from "../../Core";
import FlexBox from "../components/Flex";
// import type { ButtonStyle } from "../types/Button";

// export function CodedButton({
//   name,
//   callback,
//   style,
// }: ButtonType & {
//   style: keyof ButtonStyle;
// }) {}

export function NoticeButton({
  name,
  callback,
  color,
  border,
}: ButtonType & {
  color: string;
  border: {
    color: string;
    width: string;
  };
}) {
  return (
    <Button callback={callback}>
      {/* Styling from within the button*/}
      {/* TODO: Fix this ugly code */}
      <div
        style={{
          border: `${border.color} solid ${border.width}`,
          background: color,
        }}
      >
        {/* This will be the centered text */}
        <FlexBox direction="leftright">{name}</FlexBox>
      </div>
    </Button>
  );
}
