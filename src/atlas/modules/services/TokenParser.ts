export function parseToken(token: string): string {
  return atob(token.split(".")[0])
}