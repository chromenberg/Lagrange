const LocationAnnouncer = (await import("../../core/LocationAnnouncer")).default;
const useState = (await import("react")).useState;

export default function useRoute() {
  const [route, setRoute] = useState("/channels/@me");

  LocationAnnouncer.on("ROUTE_CHANGE", (e) => {
    console.log("[Routing/URL] Changing URL to "+`/channel/${e.guild.id}/${e.channel.id}`)
    setRoute(`/channel/${e.guild.id}/${e.channel.id}`);
  });

  return route;
}
