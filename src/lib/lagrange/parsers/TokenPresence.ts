import type { IncomingHttpHeaders } from "http";

export default function isTokenPresent(headers: string | undefined) {
  return headers !== undefined
}