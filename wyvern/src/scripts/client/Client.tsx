// import { useState } from "react";
// import { useGuildData } from "./GuildData";
const { /* useState, */ useEffect } = await import("react");
import type { Props } from "../../Core";
const identify = (await import("./socket/Identify")).default;
const useToken = (await import("./requests/Authorization")).default;
const EventSystem = (await import("../core/EventSystem")).default;
// const UserContext = (await import("./UserContext")).default;

export default function ClientWrapper({ children }: Props) {
  // const [username] = useState("");
  // const [displayName] = useState("");

  // const [currentChannel] = useState("127238068477386752");
  // const [currentGuild] = useState("127238068435435520");

  // const [userID] = useState("");
  // const [guilds] = useState<
  //   {
  //     id: string;
  //     unavailable: boolean;
  //   }[]
  // >();

  const token = useToken();
  if (token === null || token === "NO_TOKEN") {
    // throw new Error(
    //   "A token was not found or provided by the TokenStore, and no fallback information was entered",
    // );
  }
  useEffect(() => {
    const _sock = new WebSocket("http://127.0.0.1:82");

    _sock.onopen = () => {
      console.log("[Client] Connection opened to Gateway");
    };

    _sock.onmessage = (message) => {
      try {
        const msg = JSON.parse(message.data);
        console.log(msg);
        identify(_sock, token, msg);
        // If its the Dispatch OpCode
        if (msg.opCode === 0) {
  
          EventSystem.emit(msg.eventType, msg.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
  }, [token]);

  return (
    <>
      {/*<UserContext.Provider
        value={{
          display_name: displayName,
          username: username,
          id: userID,
          guilds: guilds,
          currentChannel: currentChannel,
          currentGuild: currentGuild,
          token: token,
        }}
      >*/}
      {children}
      {/*</UserContext.Provider>*/}
    </>
  );
}
