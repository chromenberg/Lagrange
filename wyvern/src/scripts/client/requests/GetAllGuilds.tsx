const fetchGuildData = (await import("./GetGuildInfo")).fetchGuildData;

export default function getAllGuilds(token: string, ids: string[]) {
  return ids.map(async (id) => {
    return await fetchGuildData(token, id);
  });
}
