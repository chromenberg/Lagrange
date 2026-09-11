import type { Props } from "../../../../Core";
import useUserAvatar from "../../../../scripts/hooks/user/useUserAvatar";
import type {
  // Direction,
  SizingName,
} from "../../../../scripts/types/SizingTypes";
import AvatarSizing from "../../../../sizings/AvatarSizings";
import Pile from "../Pile";
import PileItem from "../PileItem";

import("./AvatarPile.css");
import("../Pile.css");
import("../PileOverlaps.css")
type Overlap = keyof typeof AvatarSizing.Pile.OverlapFactors;

type ClipProps = {
  size: number;
  willMask: boolean;
  overlap: Overlap;
} & Props;

function PileClipWrapper({ children, size, willMask, overlap }: ClipProps) {
  console.log(willMask);
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size} ${size}`}
      preserveAspectRatio="none"
    >
      <mask id="clipMask" type="luminance">
        {/*
          We draw all keep parts first and then remove them with the black draw pass
          This ensures that the image is visible and we can clip out parts we dont want
        */}
        <circle cx={size / 2} cy={size / 2} r={size / 2} fill="white" />

        <circle
          cx={-(size / AvatarSizing.Pile.OverlapFactors[overlap]-2)}
          cy={size / 2}
          r={(size / 2)+2}
          fill="black"
        />
      </mask>

      {/*
          If willMask is false then we do not carve out and outline for this avatar
          Otherwise the first item would have an ugly indent and i dont want that

          the CSS contains border-radius to keep everything round
        */}
      <foreignObject mask={willMask ? "url(#clipMask)" : ""}>
        {children}
      </foreignObject>
    </svg>
  );
}

type AvatarPileItemProps = {
  user: string;
  size: number;
  index: number;
  overlap: Overlap
};
  
function AvatarPileItem({ user, size, index, overlap }: AvatarPileItemProps) {
  const avatar = useUserAvatar(user);
  const willMask = index !== 0;
  return (
    <PileItem>
      <div className="pileAvatarContainer">
        <PileClipWrapper willMask={willMask} size={size} overlap={overlap}>
          <img src={avatar} width={size} height={size} className="pileAvatar" />
        </PileClipWrapper>
      </div>
    </PileItem>
  );
}

type AvatarPileProps = {
  users: string[]; // array containing all the user ids in the pile
  // maxLength: number;
  // placeholderLength: number;
  overlap?: SizingName;
  // direction: Direction;
  height: SizingName;
  clipOverlap: Overlap;
};

function parseHeight(height: SizingName) {
  return AvatarSizing.Pile[height];
}

export default function AvatarPile({ users, height, clipOverlap, overlap }: AvatarPileProps) {
  console.warn('[AvatarPile] Prop drilling present! parameter "overlap" is passed into 2 levels of components')
  return (
    <Pile data-pile-overlap={overlap}>
      {users.map((id, i) => {
        return (
          <AvatarPileItem
            key={id}
            user={id}
            size={parseHeight(height)}
            index={i}
            overlap={clipOverlap}
          />
        );
      })}
    </Pile>
  );
}
