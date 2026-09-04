export function sendHeartbeat(socket: WebSocket, /* sequence?: number */) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  socket.send(
    JSON.stringify({
      opCode: 1,
      data: null,
    }),
  );
}