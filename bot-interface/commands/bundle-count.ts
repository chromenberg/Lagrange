import type { RawData } from "ws";
import {
  Command,
  diagnosticsData,
  DMessage,
  getCommandList,
  socket,
} from "../cli.js";
import { CommandBuilder } from "../loader.js";
import { MessageFlags } from "discord.js";
import { V2 } from "../ComponentsV2.js";

export const data = new CommandBuilder()
  .setIntegrationTypes(1)
  .setContexts(0, 1, 2)
  .setName("bundle-count")
  .setDescription("bundle-count")
  .setExecute(async (interaction) => {
    const callback = (msg: RawData) => {
      const _data = DMessage.fromRaw(msg);
      if (_data.getData().command === data.name) {
        const res = _data.getData().result;
        socket.removeListener("message", callback);
        
        interaction.reply({
          flags: MessageFlags.IsComponentsV2,
          components: [
            V2.Prefabs.TitleDetailed(
              "## " + _data.getData().description,
              [
                "Number of files in ./build",
                `**CSS**: \`${res.css}\``,
                `**JS**: \`${res.js}\``,
                `**HTML**: \`${res.html}\``,
              ].join("\n"),
            ),
          ],
          ephemeral: true,
        });

        return;
      }

      setTimeout(() => {
        socket.removeListener("message", callback);
        console.log("removing listener");
      }, 10_000);
    };
    socket.prependListener("message", callback);
    socket.send(new Command(data.name, []).toString());
  });
