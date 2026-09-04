import useUserInfo from "../../stores/user-store/UserStore"

export default function ClientUsername() {
  const info = useUserInfo()
  console.log(info)
  return <span>{info?.username}</span>
}