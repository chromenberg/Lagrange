const useState = (await import("react")).useState;
type GuildData = {
  id: string;
  unavailable: boolean;
};
export const useGuildData = () => {
  const [guildData, setGuildData] = useState<GuildData[]>([]);
  // console.log(guildData, setGuildData)
  return [guildData, setGuildData];
};
