const IdentifyProtoBuilder = (await import("../Identify.proto"))
  .IdentifyProtoBuilder;
const sendHeartbeat = (await import("./KeepAlive")).sendHeartbeat;

export default function identify(
  socket: WebSocket,
  token: string,
  msg: {
    opCode: number;
    eventType: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  },
): void {
  if (msg.opCode === 10) {
    socket.send(
      IdentifyProtoBuilder({
        intents: "1",
        token: token,
      }),
    );

    setInterval(sendHeartbeat, msg.data.heartbeat_interval, socket);
  }

  if (msg.opCode === 9) {
    console.log("[Client] Attempt to identify was invalid...");
  }
}
