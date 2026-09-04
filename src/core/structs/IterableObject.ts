import type { IterCallback } from "../types/Types.js";
export class IterableObject {
  constructor(
    private data: Object
  ) { }
  
  public forEach(callbackFn: IterCallback, ctx?: any) {
    Object.values(this.data).forEach(callbackFn, ctx)
  }
}