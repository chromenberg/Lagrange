import { Logger, LogLevel } from "../../../core/logging/Logger.js";
import { LoadGoWASM } from "../wasm/GoWASM.js"

await LoadGoWASM("./dist/lib/atlas/modules/snowflake/Snowflake.wasm");

export interface SnowflakeOptions {
  workerID: number,
  workerBits: number,
  sequenceBits: number,
  startEpoch: number
}

export interface Snowflake {
  toString(): string
  toBase64(): string
  toBinary(): string
}

export interface SnowflakeNode {
  GenerateID(): Snowflake
}

export function SnowflakeNode(args: SnowflakeOptions): SnowflakeNode {
  Logger.sendLog(LogLevel.Verbose, ["Snowflake"], "Created a new Snowflake Node with params", args);
  // @ts-ignore - This is a valid function that is pushed into global with glue code
  return SnowflakeGenerator(args.workerID, args.workerBits, args.sequenceBits, args.startEpoch);
};

export enum WorkerIDs {
  MAIN_WORKER,
  USER_SERVICE,
  GUILD_SERVICE,
  CHANNEL_SERVICE,
  ROLE_SERVICE,
  MESSAGE_SERVICE // will have multiple reserved for multiple snowflakes
}

export function test() {
  if (process.argv[2] !== "-test") return
}
