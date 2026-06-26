// import { useState } from "react";
// import { useGuildData } from "./GuildData";
import { HandleMessage } from "./HandleMessage";

// const IdentifyProtoBuilder = (await import("./Identify.proto"))
//   .IdentifyProtoBuilder;

export const socket = new WebSocket("http://127.0.0.1:82");
socket.onopen = () => {
  console.log("[Client] Connection opened to Gateway");
};
socket.onmessage = async (msg) => {
  HandleMessage(msg);
  /*
    Structure of message content

    opCode: number | undefined
    data: any
    sequenceNumber: number | undefined
    eventName: string | undefined
  */
  // socket.send(JSON.stringify({opCode: 2}))
};
// const _userData = (
//   await fetch("/api/v1/auth/register", {
//     method: "POST",
//     body: JSON.stringify({
//       username: "raine",
//       email: "raine@email.com",
//       password: "password",
//     }),
//   })
// ).json();

// export const userData = await _userData;