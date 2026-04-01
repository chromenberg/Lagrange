import EventEmitter from "events";
import { AnsiCode, AnsiText, AnsiCodeStyle } from "./Ansi.js";
export enum LogLevels {
    Verbose = -1,
    None,
    Info,
    Warning,
    Caution,
    Error,
    Critical
}

const Colors = {
    Critical: AnsiCode({
        style:[AnsiCodeStyle.Normal],
        color:[236, 0, 0]
    }),
    Warning: AnsiCode({
        style:[AnsiCodeStyle.Normal],
        color:[229, 165, 10]
    }),
    Error: AnsiCode({
        style:[AnsiCodeStyle.Normal],
        color:[230, 97, 0]
    }),
    Caution: AnsiCode({
        style:[AnsiCodeStyle.Normal],
        color:[230, 97, 0]
    }),
    Info: AnsiCode({
        style:[AnsiCodeStyle.Normal],
        color:[28, 113, 216]
    }),
    Verbose: AnsiCode({
        style:[AnsiCodeStyle.Normal],
        color:[154, 153, 150]
    }),
    Clear: AnsiCode({
        style:[AnsiCodeStyle.Normal],
    }),
}

class Logger {
    private emitter: EventEmitter = new EventEmitter();
    constructor(private readonly logLevel: number) {

        this.emitter.on("log", (eventType: number, ...args: any[]) => {
            if ((eventType < this.logLevel) && this.logLevel !== -1) return;
            switch (eventType) {
                case LogLevels.Verbose:
                    this.sendLog(AnsiText("\x1b[0;38;5;245;49m", "<VERBOSE>"), ...args);
                    break;
                case LogLevels.Info:
                    this.sendLog(AnsiText("\x1b[0;38;5;39;49m", "<INFO>"), ...args);
                    break;
                case LogLevels.Warning:
                    this.sendLog(AnsiText("\x1b[0;38;5;214;49m", "<WARN>"), ...args);
                    break;
                case LogLevels.Caution:
                    this.sendLog(AnsiText("\x1b[0;38;5;208;49m", "<CAUTION>"), ...args);
                    break;
                case LogLevels.Error:
                    this.sendLog(AnsiText("\x1b[1;38;5;202;49m", "<ERROR>"), ...args);
                    break;
                case LogLevels.Critical:
                    this.sendLog(AnsiText("\x1b[1;38;5;196;49m", "<CRITICAL>"), ...args);
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
