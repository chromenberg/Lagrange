// TODO: Fully implement this

import type { VoidCallback } from "../core/types/Types.js";
import "./imports.js"
type ContextualCallback<CBType> = {
  func: CBType;
  ctx?: unknown;
};

/**
 * Helper function to generate a Contextual Callback Object
 * Originates from type {@link ContextualCallback}
 * @param func The callback that will be stored
 * @param ctx The `this` object the callback uses, important for class methods
 * @returns A {@link ContextualCallback} object
 */
function createContextualCB<T>(
  func: T,
  ctx?: any,
): ContextualCallback<T> {
  return {
    func,
    ctx
  }
}

export class AutoExec {
  private static funcs: ContextualCallback<VoidCallback>[] = [];
  /**
   * Registers a callback into the autoexec loop
   * 
   * These callbacks cannot have any arguments
   * @param cb 
   * @param ctx 
   * @returns 
   */
  public static register(cb: VoidCallback, ctx?: unknown): AutoExec {
    this.funcs.push(createContextualCB(cb, ctx));    
    return AutoExec;
  }

  public static startLoop(): AutoExec {
    this.funcs.forEach(callbackfn => {
      callbackfn.func.call(callbackfn.ctx)
    })
    return AutoExec;
  }
}

