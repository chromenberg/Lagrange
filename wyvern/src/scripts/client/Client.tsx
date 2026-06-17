const IdentifyProtoBuilder = (await import("./Identify.proto")).IdentifyProtoBuilder;

export const socket = new WebSocket("http://127.0.0.1:82");
socket.onopen = () => {
  console.log("[Client] Connection opened to Gateway");
};
socket.onmessage = async (msg) => {
  handleMessage(msg)
  /*
    Structure of message content

    opCode: number | undefined
    data: any
    sequenceNumber: number | undefined
    eventName: string | undefined
  */
  // socket.send(JSON.stringify({opCode: 2}))

};
const _userData = (
  await fetch("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify({
      username: "raine",
      email: "raine@email.com",
      password: "password",
    }),
  })
).json();

export const userData = await _userData

async function handleMessage(message: MessageEvent) {
  const msg = JSON.parse(message.data)
  if (msg.opCode === 10) {
    _userData.then((data) => {
      if (data.reason) {return}
      socket.send(IdentifyProtoBuilder(data))
    })
    setInterval(() => {
      socket.send(JSON.stringify({
        opCode: 1,
        data: null
      }))
    }, msg.data.heartbeat_interval)
  }

  if (msg.eventType === "READY") {
    
  }
  
  console.log("[Client] ", msg);
}