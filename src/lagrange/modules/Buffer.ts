import type { ClassDeclaration } from "typescript";
import { LogLevel, Logger } from "../../core/logging/Logger.js";
import EventEmitter from "events";

export class TypedReadWriteBuffer<T> extends EventEmitter {
  private data: T[] = [];
  private _isReadable: Boolean = false;
  constructor() {
    super();
    Logger.sendLog(LogLevel.Verbose, ["LAGRANGE", "Buffer"], "A buffer has been initialised")
  }
  private emitData(...args: any[]) {
    Logger.sendLog(LogLevel.Verbose, ["LAGRANGE", "Buffer"], "Buffer has got new data (",...args,")");
    this.emit("data", ...args);
  }
  private emitReadable() {
    Logger.sendLog(LogLevel.Verbose, ["LAGRANGE", "Buffer"], "Buffer is now readable");
    this.emit("readable");
  }
  private emitDrained() {
    Logger.sendLog(LogLevel.Verbose, ["LAGRANGE", "Buffer"], "Buffer is now empty");
    this.emit("drained");
  }

  private get isReadable(): Boolean {
    return this._isReadable;
  }
  private toggleReadable() {
    this._isReadable = !this._isReadable;
  }
  public get size(): number {
    return this.data.length;
  }
  public get isNull(): Boolean {
    return this.size !== 0;
  }
  
  public read(size?: number): T{
    // store the shift result instead of directly returning it
    // because we need to say that the data is drained
    // by checking after a shift
    const shiftStore: T = this.data.shift() as T;

    if (this.isNull) {
      this.emitDrained();
      this.toggleReadable();
    };
    return shiftStore;
  }
  
  public write(data: T | T[]): Boolean {
    try { // TODO: fix the error of reading "undefined"
      if (data instanceof Array) {
        this.data = this.data.concat(data); // concat then emit the data event as we have added data
      } else {
        this.data.push(data)
      }
      this.emitData(data);

      if (!this.isReadable) {
        this.emitReadable();
        this.toggleReadable();
      };
      return true;
    } catch (e) {
      //Logger.sendLog(LogLevel.Error, ["LAGRANGE", "Buffer"], "Failed to write data into a buffer | Data: [",data,"]\nError:",e);
      return false;
    }
  }
}