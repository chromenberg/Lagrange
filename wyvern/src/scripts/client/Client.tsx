// import { useState } from "react";
// import { useGuildData } from "./GuildData";
import { useEffect, useState } from "react";
import type { Props } from "../../Core";
// import { HandleMessage } from "./HandleMessage";
const IdentifyProtoBuilder = (await import("./Identify.proto"))
  .IdentifyProtoBuilder;
const pubsub = (await import("./Listener")).pubsub;
const UserContext = (await import("./UserContext")).default;

const token =
  "MTI2NDAwMzg2MDgzODU2Mzg0.ajukxA.A8se2Bl_Jo0HYDEfSRW2gmSCbY55Cst349AyvzgVEAQ";

export default function ClientWrapper({ children }: Props) {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  const currentChannel = "Not Implemented (CurrentChannel)";
  const currentGuild = "Not Implemented (CurrentGuild)";

  const [userID, setUserID] = useState("");
  const [guilds, setGuilds] = useState<
    {
      id: string;
      unavailable: boolean;
    }[]
  >();

  function startHeartbeatLoop(
    socket: WebSocket,
    msg: {
      opCode: number;
      eventType: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any;
    },
  ): void {
    if (msg.opCode === 10) {
      console.log("rjsdfjgoidfj");
      socket.send(
        IdentifyProtoBuilder({
          intents: "1",
          token: token,
        }),
      );

      setInterval(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        socket.send(
          JSON.stringify({
            opCode: 1,
            data: null,
          }),
        );
      }, msg.data.heartbeat_interval);
    }
  }

  useEffect(() => {
    const _sock = new WebSocket("http://127.0.0.1:82");

    _sock.onopen = () => {
      console.log("[Client] Connection opened to Gateway");
    };

    _sock.onmessage = async (message) => {
      try {
        const msg = JSON.parse(message.data);
        pubsub
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          display_name: displayName,
          username: username,
          id: userID,
          guilds: guilds,
          currentChannel: currentChannel,
          currentGuild: currentGuild,
          token: token,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
}
