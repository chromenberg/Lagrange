import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import { LoadGoWASM } from "../wasm/GoWASM.js"

await LoadGoWASM("./dist/lib/atlas/modules/crypt/Crypt.wasm");

export interface Token {
  ToBase64Atlas(): string
  ToBase64(): string
}

export function GenToken(byteLength: number): Token {
  // Logger.sendLog(LogLevel.Verbose, ["TokenGen"], "Created a new Token with", byteLength, "bytes");
  // @ts-ignore - This is a valid function that is pushed into global with glue code
return NewToken(byteLength);
};


export function test() {
  if (process.argv[2] !== "-test") return
}
