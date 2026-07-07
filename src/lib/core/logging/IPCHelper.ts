export const BroadcastToIPC = (msg: string) => {
  process.emit("IPCMSGSEND", msg);
};


