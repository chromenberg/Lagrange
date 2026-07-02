import type { WeakObj } from "../../types/WeakObj";


/**
 * Checks if a request has errored, true if there is an error present
 * @param res 
 * @returns 
 */
export function validateResponse(res: WeakObj): boolean {
  const errorState: boolean = Object.hasOwn(res, "message");
  if (errorState) {
    console.log(
      "There was an error in a request, and obtained a response of:",
      res.message,
    );
  }

  return errorState;
}
