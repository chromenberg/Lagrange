import type React from "react";
import BaseInputBox from "../BaseInputBox";
import Stack from "../../stack/Stack";

type AllowedSlots = "left" | "right";

interface Slot {
  name?: string;
  slotName?: AllowedSlots;
  children: React.ReactNode;
}

// Defines the slots an accessory can be mounted to in the input box
// this could be further modified with the slot defining the side
interface Slots {
  left: Slot[];
  right: Slot[];
}

export default function SlottedInputBox({
  accessories,
}: {
  accessories: Slots;
}) {
  return (
    <BaseInputBox>
      {/* Left Accessories */}
      {accessories.left.length > 0 && (
        <Stack slot-left fillAll>
          {accessories.left.map((item) => item.children)}
        </Stack>
      )}
      <div className="textContainer">hello</div>
      {/* Right Accessories */}
      {accessories.right.length > 0 && (
        <Stack slot-right fillAll>
          {accessories.right.map((item) => item.children)}
        </Stack>
      )}
    </BaseInputBox>
  );
}
