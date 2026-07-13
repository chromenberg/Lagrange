import useGuildStore from "../../../scripts/stores/guild-store/GuildStore";
import type { GuildIconProps } from "./GuildIconProps";
const { AutoTextSize } = await import("auto-text-size");
const { Regex } = await import("../../../scripts/text/RegexData");
const LinkTo = (await import("../links/LinkTo")).default;
const RegexParseError = (
  await import("../../../scripts/errors/RegexParseError")
).default;
const useLastOpenedChannel = (
  await import("../../../scripts/stores/last-opened-channel-store/LastChannelStore")
).default;
const { GuildNameSize } = await import("../../../sizings/GuildSizings");
import("./GuildIcon.css");
import("./GuildIconText.css");


// https://cdn.discordapp.com/icons/<guild_id>/<icon_hash>.webp?size=80&quality=lossless
function GuildIconImage() {
  return <div>
    <img src></img>
  </div>
}

export default function GuildIcon({ guildInfo }: GuildIconProps) {
  const guildName = guildInfo.name;
  const guildID = guildInfo.id;
  
  const lastOpenedChannel = useLastOpenedChannel(guildInfo.id);
  const channel = useGuildStore()
    .find((guild) => guild.id === guildID)
    ?.channels.find(
      (channel) => channel.id === lastOpenedChannel || guildInfo.firstChannel,
    )?.name;

  const ensureString = () => {
    if (typeof lastOpenedChannel !== "string") {
      return guildInfo.firstChannel;
    } else {
      return lastOpenedChannel;
    }
  };

  // get the first letter of every word in the guild name
  const firstLettersOfName = (): string => {
    const regexpResult = guildName.match(Regex.FirstLetterOfWords);
    if (regexpResult === null) {
      throw new RegexParseError();
    }
    return regexpResult.join("");
  };

  return (
    <div className="tempGuildIconPlaceholder">
      <div className="guildIconContainer">
        <div className="red fillAll">
          
        </div>
        {/* Ensure the guild name is actually scaling properly */}
        <AutoTextSize
          className="tempGuildIconNamePlaceholder"
          maxFontSizePx={GuildNameSize}
        >
          {/* Get first letters of every word in the name */}
          {firstLettersOfName()}
        </AutoTextSize>
      </div>
    </div>
  );
}
