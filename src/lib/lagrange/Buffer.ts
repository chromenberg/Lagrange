import type { ClassDeclaration } from "typescript";
import { LogLevel, Logger } from "../../../../Common/Logging/dist/Logger.js";
import EventEmitter from "events";

export class TypedReadWriteBuffer extends EventEmitter {
    private data = [];
    //private data: any;
    private _isReadable: Boolean = false;
    constructor() {
        super();
        //this.data as typeof type[]
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
    public read<T>(size?: number): T{ // todo: clean this up a bit
        // if (size) {
        //     const shiftStore: T[] = this.data.splice(0, size);

        //     if (this.isNull) {
        //         this.emitDrained();
        //         this.toggleReadable(); // readable state should be false now
        //     };
        //     return shiftStore;
        // }
        // store the shift result instead of directly returning it
        // because we need to say that the data is drained
        // by checking after a shift
        const shiftStore: T = this.data.shift() as T;

        if (this.isNull) {
            this.emitDrained();
            this.toggleReadable(); // readable state should be false now
        };
        return shiftStore;
    }
    //? Writing will almost exclusively not be an array, unless i decide to use this in the API, which i would be making this more OOP friendly anyways
    public write<T>(data: T | T[]): Boolean { // todo: clean this up a bit
        if (data instanceof Array) { // check if we are trying to add an array to the buffer
            try {
                this.data = this.data.concat(data as []); // concat then emit the data event as we have added data

                this.emitData(data); // todo: clean up
                if (!this.isReadable) {
                    this.emit("readable");
                    this.toggleReadable(); // readable state should be true now
                };

                return true;
            } catch (e) {
                Logger.sendLog(LogLevel.Error, ["LAGRANGE", "Buffer"], "Failed to write data into a buffer | Data: [",data,"]\nError:",e);
                return false;
            }
        } else {
            try {
                this.data.push(data as never);

                this.emitData(data); // todo: clean up
                if (!this.isReadable) {
                    this.emitReadable();
                    this.toggleReadable(); // readable state should be true now
                };
                return true;
            } catch (e) {
                //Logger.sendLog(LogLevels.Error, "Failed to write data into a buffer | Data: [",data,"]\nError:",e);
                return false;
            }
        }
        
    }
}