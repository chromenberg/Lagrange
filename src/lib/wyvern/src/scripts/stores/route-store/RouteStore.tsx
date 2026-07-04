const LocationAnnouncer = (await import("../../core/LocationAnnouncer")).default;
const useState = (await import("react")).useState;

export default function useRoute() {
  const [route, setRoute] = useState("/channels/@me");

  LocationAnnouncer.on("ROUTE_CHANGE", (e) => {
    console.log("route change")
    setRoute(`/channel/${e.guild.id}/${e.channel.id}`);
  });

  return route;
}
