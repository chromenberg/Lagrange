import { WebSocket } from "ws";
import { DMessage, DCode } from "./diag-socket.js";

const socket = new WebSocket("ws://localhost:8192");


socket.on("open", () => {
  {
    const message = new DMessage()
    message.setCode(DCode.HELLO)
    socket.send(message.toString())    
  }
  
  // --- Invoke Function List

  {
    const message = new DMessage()
    message.setCode(DCode.INVOKE)
    message.setData({
      command: "list"
    })
    socket.send(message.toString())
  }
  
  {
    const message = new DMessage()
    message.setCode(DCode.INVOKE)
    message.setData({
      command: "bundle-count"
    })
    socket.send(message.toString())
  }
});

socket.on("message", (msg) => {
  console.log("Client: ",DMessage.fromRaw(msg))
})