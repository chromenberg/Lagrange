type ButtonType = "primary" | "secondary" | "tertiary";
import "./Button.css";
import "../../main.css";
import FlexBox from "../components/Flex";
import CursorInteractWrapper from "./CursorInteractZone";
import type { MouseEventHandler } from "react";
export default function Button({
  type,
  name,
  onClick
}: {
  type: ButtonType;
    name: string;
  onClick?: MouseEventHandler
}) {
  return (
    // we could probably use this as a wrapper to make interactable
    // elements like buttons
    // by just passing a function into it
    <CursorInteractWrapper>
      <div className={"buttonBase button-" + type} onClick={onClick}>
      <FlexBox direction="leftright" center="both">
        {name}
      </FlexBox>
    </div>
      
    </CursorInteractWrapper>
  );
}
