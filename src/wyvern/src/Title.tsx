// import type { Props } from "./Core";

import useUserInfo from "./scripts/stores/client-store/ClientStore"

export default function TitleBar() {
  const userData = useUserInfo()
  
  return <div id="titleBar">
    Currently logged in as: {`${userData?.username} (${userData?.id})`}
  </div>
}