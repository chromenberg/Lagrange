import { connect, type Socket } from "net";
type foid = void
type UnixSocketEventMap = "message" | "close" | "connect" | "ready"

class UnixSocket {
    private readonly socket: Socket;
    constructor(path: string) {
        this.socket = connect({path});
    }
    
    public on(eventName: UnixSocketEventMap, callback: (...args: any[]) => void) {
        if (eventName === "message") {
            this.socket.on("data", callback);
            return;
        }

        this.socket.on(eventName, callback);
    }

    public write(data: string | Buffer<ArrayBuffer>): void {
        this.socket.write(data)
    }
}


class AtlasSocket extends UnixSocket {

}

