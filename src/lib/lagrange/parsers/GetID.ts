/**
 * Gets the user id from an auth token
 * @param token the users token
 * @returns the users ID
 */
export default function getIDFromToken(token: string): string {
  return btoa(token.split(".")[0]);
}