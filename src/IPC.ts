// export const client = new WebSocket("ws://127.0.0.1:8515");

// const queue: any[] = []

// process.on("IPCMSGSEND", (msg) => {
//   queue.push(msg)
// })

// client.onopen = () => {
//   client.send(queue.shift())

//   setInterval(() => {
//     client.send("dfgdfgdfg")
//   }, 1_000)
// }

// client.addEventListener("message", (msg) => {
//   console.log(msg.data);
// });
