import useUserInfo from "../../stores/client-store/ClientStore"

export default function ClientUsername() {
  const info = useUserInfo()
  console.log(info)
  return <span>{info?.username}</span>
}