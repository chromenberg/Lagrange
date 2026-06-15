export const socket = new WebSocket("http://127.0.0.1:81");
socket.onopen = () => {
  console.log("[Client] Connection opened to Gateway");
};
socket.onmessage = async (msg) => {
  const content = JSON.parse(msg.data);
  /*
    Structure of message content

    opCode: number | undefined
    data: any
    sequenceNumber: number | undefined
    eventName: string | undefined
  */
  // socket.send(JSON.stringify({opCode: 2}))
  console.log("[Client] ", content);
};
export const userData = (await (
  await fetch("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify({
      username: "raine",
      email: "raine@email.com",
      password: "password",
    }),
  })
).json());

console.log(userData);
