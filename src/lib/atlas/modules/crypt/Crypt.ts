import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import { LoadGoWASM } from "../wasm/GoWASM.js"

await LoadGoWASM("./dist/lib/atlas/modules/crypt/Crypt.wasm");

export interface Token {
  toBase64Atlas(): string
  toBase64(): string
}

export function SnowflakeNode(byteLength: number): Token {
  Logger.sendLog(LogLevel.Verbose, ["Snowflake"], "Created a new Snowflake Node with params", args);
  // @ts-ignore - This is a valid function that is pushed into global with glue code
  return NewToken(byteLength);
};


export function test() {
  if (process.argv[2] !== "-test") return
}
