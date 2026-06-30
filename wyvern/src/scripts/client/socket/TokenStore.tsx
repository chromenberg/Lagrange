import { useEffect, useState } from "react";
import authenticateUser from "../requests/AuthenticateUser";

// TODO: Not hardcode this
localStorage.setItem("ApplicationSessionToken", "NO_TOKEN");

export default function useTokenStore() {
  const localToken =
    localStorage.getItem("ApplicationSessionToken") ?? "NO_TOKEN";
  const [useToken, setToken] = useState(localToken);

  useEffect(() => {
    // if (localToken === null || localToken === "NO_TOKEN") {
    console.log("[LocalStore] Couldn't find ApplicationSessionToken");
    const a = prompt("token not found, enter email", "s") as string;
    const b = prompt("token not found, enter password", "s") as string;
    authenticateUser({
      email: a,
      password: b,
    }).then(async (tokenData) => {
      const token = (await tokenData.json()).token;
      localStorage.setItem("ApplicationSessionToken", token);
      setToken(token);
    });
    // return;
    // }
    // console.log("token store")
    // eslint-disable-next-line react-hooks/set-state-in-effect -- This should work regardless
    // setToken(localToken);
  }, [localToken]);

  return useToken;
}
