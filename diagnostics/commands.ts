import { readdirSync } from "fs";
import { commands, DCommand } from "./diag-socket.js";

{
  const callback = () => {
    const dir = readdirSync("./build/", { recursive: true });

    const cssCount = dir.filter((file) => file.toString().endsWith(".css"));
    const htmlCount = dir.filter((file) => file.toString().endsWith(".html"));
    const jsCount = dir.filter((file) => file.toString().endsWith(".js"));

    return {
        css: cssCount.length,
        html: htmlCount.length,
        js: jsCount.length,
    };
  };
  commands.addCommand(
    new DCommand(
      "bundle-count",
      callback,
      "Website Bundle Count",
    ),
  );
}

{
  const callback = () => {};
  commands.addCommand(
    new DCommand(
      "connected-clients",
      callback,
      "Gets the currently connected accounts",
    ),
  );
}

{
  const callback = () => {};
  commands.addCommand(
    new DCommand("users-detailed", callback, "Gets accounts"),
  );
}
