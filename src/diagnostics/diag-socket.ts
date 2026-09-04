import { WebSocketServer } from "ws";
import { Logger, LogLevel } from "../core/logging/Logger.js";
import type { WebSocket } from "ws";

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
  private _data: any = null;

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

  public setData(...data: any[]): this {
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
    socket.send(new DMessage().setCode(DCode.HELLO).setMessage("Connected to Wyvern Diagnostics.").toString());
  };

  const messageHandler = (socket: WebSocket, message: DMessage) => {
    switch (message.getCode()) {
      case DCode.HELLO:
        helloHandler(socket);
        break;
    }
  };

  const connectionHandler = (socket: WebSocket) => {
    socket.on("message", (data: any) => {
      const message = DMessage.fromRaw(data);
      messageHandler(socket, message);
    });
  };
  diagnostic.on("connection", connectionHandler);
})();
