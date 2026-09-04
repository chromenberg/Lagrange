export default class RegexParseError extends Error {
  constructor(message?: string) {
    super(message ?? "Regex found zero matches and returned null.")
  }
}