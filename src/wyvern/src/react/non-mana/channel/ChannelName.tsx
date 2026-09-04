const useCurrentRoute = (await import("../../../scripts/stores/current-store/CurrentStore")).useCurrentRoute

export default function ChannelName() {
  const location = useCurrentRoute()
  return <span>{location ? location.channel.name : "none"}</span>
}