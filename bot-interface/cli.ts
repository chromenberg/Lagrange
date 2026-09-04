import { WebSocket } from "ws";
import type { WeakObj } from "../src/core/types/Types.js";
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
export class Command {
  private _name: string;
  private _args: any[];
  constructor(name: string, args: any[]) {
    this._name = name;
    this._args = args;
  }

  public getName(): string {
    return this._name;
  }

  public getArgs(): any[] {
    return this._args;
  }

  public build(): DMessage {
    return new DMessage().setCode(DCode.INVOKE).setData({
      command: this.getName(),
      arguments: this.getArgs(),
    });
  }

  public toString(): string {
    return this.build().toString();
  }
}

export const socket = new WebSocket("ws://localhost:8192");

export function getCommandList() {
  socket.send(new Command("list", []).toString());
}

export const diagnosticsData = {
  commands: []
}
socket.on("open", () => {
  
getCommandList()
})
socket.on("message", (msg) => {
  const data = DMessage.fromString(msg.toString());

  switch (data.getCode()) {
    case DCode.RESULT:
      console.info(data.getData());
      if (data.getData().data === "list") {
        diagnosticsData.commands = data.getData().commands;
      }
      break;
  }
});