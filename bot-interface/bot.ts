import {
  Client,
  GatewayIntentBits,
  Collection,
  Events,
  EmbedBuilder,
  Message,
} from "discord.js";
import config from "./config.json" with { type: "json" };
import { CommandRegistry } from "./loader.js";
import "./cli.js"
// import { MessageManager } from "./modules/models/Managers.js";

const commandReg = new CommandRegistry();

export const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

client.login(config.token);
client.on("ready", () => {
  commandReg.update();
  console.log("ready");
});

client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  commandReg.getCommand(interaction.commandName).execute(interaction);
});

