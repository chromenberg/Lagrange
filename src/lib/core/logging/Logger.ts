import EventEmitter from "events"

export function AnsiText(color: string, text: string): string {
  return color+text+"\x1b[0;39;49m";
}

export enum LogLevel {
  None = -1,
	Debug,
	Verbose,
	Info,
	Success,
	Warning,
	Caution,
	Error,
	Critical,
	Fatal
}

export interface LogMessage {
	level: LogLevel
	path: string[] 
	content: any[]
}

export class _Logger {
	private readonly eventEmitter = new EventEmitter();
	constructor(
		private LogLevelFilter: LogLevel | number[]
	) {
		this.eventEmitter.on("message", (data: LogMessage) => {
			// filter out messages depending on what type the filter is
			if ((typeof this.LogLevelFilter === "number") && (data.level < this.LogLevelFilter)) return;
			if ((typeof this.LogLevelFilter === "object") && (!this.LogLevelFilter.includes(data.level))) return;
			this.log(data);
		})
	}

	private applyStyling(data: string, color?: string): string {
		if (color) return AnsiText(color, data);
		return data;
	}

	private _log(level: string, path: string[], color?: string, ...content: any[]): void {
		console.log(
			this.applyStyling(
				level.padEnd(9)+
				"| ["+path.slice(-3).join(" > ")+"]",
				color
			)+" -",
			...content
		);
	}

	private log(data: LogMessage): void {
		switch (data.level) {
			case LogLevel.Fatal: {
				this._log("FATAL", data.path, ...data.content);
				this.eventEmitter.emit("error", ...data.content);
				break;
			}
			case LogLevel.Critical: {
				this._log("CRITICAL", data.path, "\x1b[5;1;38;5;196;49m", ...data.content);
				this.eventEmitter.emit("error", ...data.content);
				break;
			}
			case LogLevel.Error: {
				this._log("ERROR", data.path, "\x1b[1;38;5;202;49m", ...data.content);
				this.eventEmitter.emit("error", ...data.content);
				break;
			}
			case LogLevel.Caution: {
				this._log("CAUTION", data.path, "\x1b[0;38;5;208;49m", ...data.content);
				break;
			}
			case LogLevel.Warning: {
				this._log("WARNING", data.path, "\x1b[0;38;5;130;49m", ...data.content);
				break;
			}
			case LogLevel.Success: {
				this._log("SUCCESS", data.path, "\x1b[1;38;5;46;49m", ...data.content);
				break;
			}
			case LogLevel.Info: {
				this._log("INFO", data.path, "\x1b[0;38;5;39;49m", ...data.content);
				break;
			}
			case LogLevel.Verbose: {
				this._log("VERBOSE", data.path, "\x1b[0;38;5;245;49m", ...data.content);
				break;
      }
      case LogLevel.Debug: {
				this._log("Process", data.path, "\x1b[0;38;5;245;49m", ...data.content);
				break;
			}
		}
	}
	public sendLog(level: number, path: string[], ...content: any[]): void {
		this.eventEmitter.emit("message", {
			level,
			path,
			content
		});
  }
  public setLogLevel(newLevel: LogLevel): void {
    this.LogLevelFilter = newLevel;
	}
}

export const Logger = new _Logger(LogLevel.Verbose)