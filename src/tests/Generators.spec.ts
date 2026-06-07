import test, { describe } from "node:test";
import { AtlasManager } from "../atlas.index.js";

describe("Token Generation", (tctx) => {
  console.log("Running Token Generation tests");

  test("Generation Speed", (ctx) => {
    const startTime = Date.now();

    for (let i = 0; i <= 500; i++) {
      // generate a new token with a new id
      AtlasManager.requests.users.newAuthToken(
        AtlasManager.requests.users.newUserID(),
      );
    }

    const endTime = Date.now()

    ctx.diagnostic("Time taken to generate 500 ids: "+(endTime-startTime).toString()+"ms")
  });
});
