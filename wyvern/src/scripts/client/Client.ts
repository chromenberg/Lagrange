
export const socket = new WebSocket("http://127.0.0.1:81")
socket.onopen = () => {
  console.log("[Client] Connection opened to Gateway")
}
socket.onmessage = async (msg) => {
  const content = JSON.parse(msg.data)
  /* 
    Structure of message content

    opCode: number | undefined
    data: any
    sequenceNumber: number | undefined
    eventName: string | undefined
  */

  console.log("[Client] ", content)
}