const LocationAnnouncer = (
  await import("../../../scripts/core/LocationAnnouncer")
).default;
const useGuildStore = (
  await import("../../../scripts/stores/guild-store/GuildStore")
).default;
const ClickCapture = (await import("../../mana/wrappers/ClickCapture")).default;
const GuildIconImage = (await import("./GuildIconImage")).default;
import type { GuildIconProps } from "./GuildIconProps";
const { AutoTextSize } = await import("auto-text-size");
const { Regex } = await import("../../../scripts/text/RegexData");
// const LinkTo = (await import("../links/LinkTo")).default;
const RegexParseError = (
  await import("../../../scripts/errors/RegexParseError")
).default;
const useLastOpenedChannel = (
  await import("../../../scripts/stores/last-opened-channel-store/LastChannelStore")
).default;
const { GuildNameSize } = await import("../../../sizings/GuildSizings");
import("./GuildIcon.css");
import("./GuildIconText.css");

export default function GuildIcon({ guildInfo }: GuildIconProps) {
  const guildName = guildInfo.name;
  const guildID = guildInfo.id;
  const lastOpenedChannel = useLastOpenedChannel(guildInfo.id);
  const channel = useGuildStore()
    .find((guild) => guild.id === guildID)
    ?.channels.find(
      (channel) => channel.id === lastOpenedChannel || guildInfo.firstChannel,
    )?.name;
  const invokeGuildChange = () => {
    LocationAnnouncer.emit("ROUTE_CHANGE", {
      guild: {
        id: guildID,
        name: guildName,
      },
      channel: {
        id: channel ? lastOpenedChannel : guildInfo.firstChannel,
      },
    });
  };

  // const ensureString = () => {
  //   if (typeof lastOpenedChannel !== "string") {
  //     return guildInfo.firstChannel;
  //   } else {
  //     return lastOpenedChannel;
  //   }
  // };

  // get the first letter of every word in the guild name
  const firstLettersOfName = (): string => {
    const regexpResult = guildName.match(Regex.FirstLetterOfWords);
    if (regexpResult === null) {
      throw new RegexParseError();
    }
    return regexpResult.join("");
  };

  let guildIconElement = (
    <AutoTextSize maxFontSizePx={GuildNameSize}>
      {firstLettersOfName()}
    </AutoTextSize>
  );
  console.log(guildInfo.icon);
  if (guildInfo.icon !== null) {
    guildIconElement = (
      <GuildIconImage icon_hash={guildInfo.icon} id={guildID} />
    );
  }

  return (
    <div className="guildBarIcon" data-guild={guildID}>
      <div className="guildIconContainer">
        <ClickCapture callback={invokeGuildChange} args={[]}>
          {guildIconElement}
        </ClickCapture>
      </div>
    </div>
  );
}
