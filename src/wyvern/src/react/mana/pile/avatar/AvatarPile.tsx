import useUserAvatar from "../../../../scripts/hooks/user/useUserAvatar";
import type {
  Direction,
  SizingName,
} from "../../../../scripts/types/SizingTypes";
import AvatarSizing from "../../../../sizings/AvatarSizings";
import Pile from "../Pile";
import PileItem from "../PileItem";

import("./AvatarPile.css");
import("../Pile.css");

type AvatarPileItemProps = {
  user: string;
  size: number;
};

function AvatarPileItem({ user, size }: AvatarPileItemProps) {
  const avatar = useUserAvatar(user);
  console.log(avatar);
  return (
    <PileItem>  
      <div className="pileAvatarContainer">
        <img src={avatar} width={size} height={size} className="pileAvatar" />
      </div>
    </PileItem>
  );
}

type AvatarPileProps = {
  users: string[]; // array containing all the user ids in the pile
  // maxLength: number;
  // placeholderLength: number;
  // overlap: SizingName;
  // direction: Direction;
  height: SizingName;
};

function parseHeight(height: SizingName) {
  return AvatarSizing.Pile[height];
}

export default function AvatarPile({ users, height }: AvatarPileProps) {
  return (
    <Pile>
      {users.map((id) => {
        
        return <AvatarPileItem user={id} size={parseHeight(height)} />;
      })}
    </Pile>
  );
}
