// import type { Props } from "./Core";

import useUserInfo from "./scripts/stores/user-store/UserStore"

export default function TitleBar() {
  const userData = useUserInfo()
  
  return <div id="titleBar">
    Currently logged in as: {`${userData.username} (${userData.id})`}
  </div>
}