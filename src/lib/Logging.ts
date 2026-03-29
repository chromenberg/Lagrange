import EventEmitter from "events";
export enum LogLevels {
    Verbose = -1,
    None,
    Info,
    Warning,
    Caution,
    Error,
    Critical
}
class Logger {
    private emitter: EventEmitter = new EventEmitter();
    constructor(private readonly logLevel: number) {

        this.emitter.on("log", (eventType: number, ...args: any[]) => {
            if ((eventType < this.logLevel) && this.logLevel !== -1) return;
            switch (eventType) {
                case LogLevels.Verbose:
                    this.sendLog("<VERBOSE>", ...args);
                    break;
                case LogLevels.Info:
                    this.sendLog("<INFO>", ...args);
                    break;
                case LogLevels.Warning:
                    this.sendLog("<WARN>", ...args);
                    break;
                case LogLevels.Caution:
                    this.sendLog("<CAUTION>", ...args);
                    break;
                case LogLevels.Error:
                    this.sendLog("<ERROR>", ...args);
                    break;
                case LogLevels.Critical:
                    this.sendLog("<CRITICAL>", ...args);
                    break;

                default:
                    this.sendLog("<NONE>", ...args);
                    break;
            }
        })
    }
    public sendLog(...args: any[]): void {
        console.log(...args);
    }

    public log(eventType: number, ...args: any[]): void {
        this.emitter.emit("log", eventType ,...args)
    }
}

class ServerLogger extends Logger {
    constructor(logLevel: number) {
        super(logLevel);
    }

    public sendLog(...args: any[]): void {
        console.log("[SERVER]", ...args);
    }
}

class ClientLogger extends Logger {
    constructor(logLevel: number) {
        super(logLevel);
    }

    public sendLog(...args: any[]): void {
        console.log("[CLIENT]", ...args);
    }
}

export const CliLogger = new ClientLogger(-1);
export const SerLogger = new ServerLogger(-1);
