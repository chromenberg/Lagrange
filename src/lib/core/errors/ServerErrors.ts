type GatewayError = {
  code: number;
  message: string;
};
export enum GatewayErrorCodes {
  UNKNOWN = 4000,
  UNK_OPCODE,
  DECODE_ERR,
  NOT_AUTHED,
  AUTH_FAILED,
  ALREADY_AUTH,
  INVALID_SEQ,
  RATE_LIMITED,
  TIMEOUT,
  NOT_IMPLEMENTED_PLACEHOLDER,
  INVALID_API_VER,
  INVALID_INTENTS,
  INTENTS_NOT_ALLOWED,
}
export enum APIErrorCodes {
  MALFORMED_BODY = 2000,
  INVALID_HEADERS,
  RATE_LIMITED,
}

export const GatewayErrors = {
  [GatewayErrorCodes.UNKNOWN]: { message: "Unknown error" },
  [GatewayErrorCodes.UNK_OPCODE]: { message: "Unknown opcode" },
  [GatewayErrorCodes.DECODE_ERR]: { message: "Decode error" },
  [GatewayErrorCodes.AUTH_FAILED]: { message: "Authentication failed" },
  [GatewayErrorCodes.NOT_AUTHED]: { message: "Not authorized" },
  [GatewayErrorCodes.ALREADY_AUTH]: { message: "Already authorized" },
  [GatewayErrorCodes.INVALID_SEQ]: { message: "Invalid sequence" },
};

export function GatewayError<K extends keyof typeof GatewayErrors>(
  code: K,
): (typeof GatewayErrors)[K] {
  return GatewayErrors[code];
}

function errorMessage(message: string): { message: string } {
  return {message}
}

export enum IErrorEnum {
  BigIntParseFail,
  NoClientIDProvided,
  NoRouterResponse,
  NoDBResponse,
  MalformedAPIData,
  MalformedDBData,
  MalformedEventData,
  NoExpectedImmediateClientResponse,
  TableSetupFailed,
  PoolConnectionNotReturned
}

export const InternalErrors = {
  [IErrorEnum.BigIntParseFail]: errorMessage("Failed to parse a bigint into a string"),
  [IErrorEnum.MalformedAPIData]: errorMessage("Malformed data was received by the API")
}