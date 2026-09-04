import { WebSocketServer } from "ws";
import { Logger, LogLevel } from "../core/logging/Logger.js";
import type { WebSocket } from "ws";
import { Collection } from "../core/structs/Collection.js";
import type { WeakObj } from "../core/types/Types.js";

const diagnostic = new WebSocketServer({
  port: 8192,
  host: "localhost",
});

export interface DEvent {
  setMessage: (...content: any[]) => void;
  getMessage: () => string;

  setCode: (code: number) => void;
  getCode: () => number;

  setData: (...data: any[]) => void;
  getData: () => any;

  toString: () => string;
}

export interface DMessageData {
  message: string;
  code: DCode;
  data: any;
}

export enum DCode {
  NONE,
  HELLO,
  GATEWAY,
  DATABASE,
  INVOKE,
  REQUEST,
  RESULT,
  REJECT,
  INTERNAL_ERROR,
  VERBOSE,
  INFO,
  WARN,
  ERROR,
  FATAL,
}

export const DMessageCodeMap: Record<DCode, string> = {
  [DCode.NONE]: "NullCode",
  [DCode.HELLO]: "Hello",
  [DCode.GATEWAY]: "Gateway",
  [DCode.DATABASE]: "Database",
  [DCode.INVOKE]: "Invoke",
  [DCode.REQUEST]: "Request",
  [DCode.RESULT]: "Result",
  [DCode.REJECT]: "Reject",
  [DCode.INTERNAL_ERROR]: "Internal Error",
  [DCode.VERBOSE]: "Verbose",
  [DCode.INFO]: "Info",
  [DCode.WARN]: "Warn",
  [DCode.ERROR]: "Error",
  [DCode.FATAL]: "Fatal",
};

export class DMessage implements DEvent {
  constructor() {}

  private _message: string = "";
  private _code: DCode = DCode.NONE;
  private _data: WeakObj | null = null;

  public setMessage(...content: any[]): this {
    this._message = content.join(" ");
    return this;
  }
  public getMessage(): string {
    return this._message;
  }

  public setCode(code: DCode): this {
    this._code = code;
    return this;
  }
  public getCode(): number {
    return this._code;
  }

  public setData(data: WeakObj): this {
    this._data = data;
    return this;
  }
  public getData(): any {
    return this._data;
  }

  public toString(): string {
    return JSON.stringify({
      message: this._message,
      code: this._code,
      data: this._data,
    });
  }

  public fromString(data: string): DMessage {
    return DMessage.fromString(data);
  }

  public fromRaw(data: any): DMessage {
    return DMessage.fromRaw(data);
  }

  public static fromString(data: string): DMessage {
    const json = JSON.parse(data) as DMessageData;

    const dmsg = new DMessage();

    dmsg.setMessage(json.message);
    dmsg.setCode(json.code);
    dmsg.setData(json.data);

    return dmsg;
  }

  public static fromRaw(data: any): DMessage {
    return DMessage.fromString(data);
  }
}

export class DCommandRegister {
  private _commands: DCommand[] = [];
  constructor() {}

  public addCommand(cmd: DCommand) {
    this._commands.push(cmd);
  }

  public getCommand(name: string): DCommand | undefined {
    return this._commands.find((cmd) => cmd.name === name);
  }

  public hasCommand(name: string): boolean {
    return this._commands.some((cmd) => cmd.name === name);
  }

  public get commands(): DCommand[] {
    return this._commands;
  }

  public listCommands(): DCommand[] {
    return this.commands;
  }

  public get commandNames(): string[] {
    return this._commands.map((cmd) => cmd.name);
  }
}

type AnyCallback = (...args: any[]) => any;

export class DCommand {
  private _command: string;
  private _description: string;
  private _callback: AnyCallback;

  constructor(name: string, callback: AnyCallback, description?: string) {
    this._command = name;
    this._callback = callback;
    this._description = description ?? "No description provided.";
  }

  public get name(): string {
    return this._command;
  }

  public get description(): string {
    return this._description;
  }

  public get callback(): AnyCallback {
    return this._callback;
  }

  // public call<
  //   P = Parameters<typeof this.callback>,
  //   R = ReturnType<typeof this.callback>,
  // >(...args: Array<P>): R {
  //   return this._callback(...args);
  // }

  public call(...args: any[]): any {
    return this._callback(...args);
  }
}

const commands = new DCommandRegister();
commands.addCommand(
  new DCommand(
    "list",
    commands.listCommands,
    "Lists the commands able to be called through diagnostics",
  ),
);

interface DCommandInvoke {
  command: string;
  arguments: any[];
}

// Start the socket handler
(() => {
  Logger.sendLog(
    LogLevel.Verbose,
    ["Diagnostics"],
    "Starting diagnostics socket",
  );
  const helloHandler = (socket: WebSocket) => {
    Logger.sendLog(
      LogLevel.Verbose,
      ["Diagnostics"],
      "Client connected to diagnostics socket",
    );
    socket.send(
      new DMessage()
        .setCode(DCode.HELLO)
        .setMessage("Connected to Wyvern Diagnostics.")
        .toString(),
    );
  };

  const commandHandler = (socket: WebSocket, message: DMessage) => {
    // convert to dcommand then get the command name and args
    const data = message.getData() as DCommandInvoke;
    const commandName = data.command;
    const commandArgs = data.arguments;

    // get the command from the command name
    const command = commands.getCommand(commandName);
    Logger.sendLog(
      LogLevel.Verbose,
      ["Diagnostics"],
      `Trying to execute command "${commandName}" with arguments [${commandArgs}]`,
    );
    if (command) {
      Logger.sendLog(
        LogLevel.Verbose,
        ["Diagnostics"],
        `Executing command "${commandName}" with arguments [${commandArgs}]`,
      );
      const res = command.call(commandArgs)
      // send command result
      socket.send(
        new DMessage()
          .setCode(DCode.RESULT)
          .setMessage("Placeholder data")
          .setData(res)
          .toString(),
      );
    } else {
      socket.send(
        new DMessage()
          .setCode(DCode.ERROR)
          .setMessage("Command not found.")
          .toString(),
      );
    }
  };

  const messageHandler = (socket: WebSocket, message: DMessage) => {
    switch (message.getCode()) {
      case DCode.HELLO:
        helloHandler(socket);
        break;
      case DCode.INVOKE:
        commandHandler(socket, message);
        break;
    }
  };

  const connectionHandler = (socket: WebSocket) => {
    socket.on("message", (data: any) => {
      const message = DMessage.fromRaw(data);
      Logger.sendLog(LogLevel.Verbose, ["Diagnostics"], message);
      messageHandler(socket, message);
    });
  };

  diagnostic.on("connection", connectionHandler);
})();
