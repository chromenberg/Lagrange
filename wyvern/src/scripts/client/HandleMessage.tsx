import { socket } from "./Client";
// import { useGuildData } from "./GuildData";
import { IdentifyProtoBuilder } from "./Identify.proto";
import { pubsub } from "./Listener";

export function HandleMessage(message: MessageEvent) {
  const msg = JSON.parse(message.data);
  // const [data, setData] = useGuildData()
  if (msg.opCode === 10) {
    socket.send(
      IdentifyProtoBuilder({
        intents: "1",
        token:
          "MTI2NDAwMzg2MDgzODU2Mzg0.ajukxA.A8se2Bl_Jo0HYDEfSRW2gmSCbY55Cst349AyvzgVEAQ",
      }),
    );

    setInterval(() => {
      socket.send(
        JSON.stringify({
          opCode: 1,
          data: null,
        }),
      );
    }, msg.data.heartbeat_interval);
  }

  if (msg.eventType === "READY") {
    pubsub.dispatchEvent(new Event("test"))
    // console.log(msg.data/
    // setData(msg.data.gilds)
    // console.log(data)
  }
  console.log("[Client] ", msg);
}
