import {
SlashCommandBuilder,
  Routes,
  REST,
  type Interaction,
  InteractionContextType,
  type RestOrArray,
  SlashCommandBooleanOption,
  SlashCommandUserOption,
  SlashCommandAttachmentOption,
  InteractionResponse,
  CommandInteraction,
  type Permissions,
  type LocaleString,
  type LocalizationMap,
  ApplicationIntegrationType,
  type SlashCommandOptionsOnlyBuilder,
  SlashCommandChannelOption,
  SlashCommandIntegerOption,
  SlashCommandMentionableOption,
  SlashCommandNumberOption,
  SlashCommandRoleOption,
  SlashCommandStringOption,
  SlashCommandSubcommandBuilder,
  type SlashCommandSubcommandsOnlyBuilder,
  SlashCommandSubcommandGroupBuilder,
  Events,
  ChatInputCommandInteraction,
  type CacheType,
} from "discord.js";
import { client } from "./bot.js";
import config from "./config.json" with { type: "json" };
import { readdir } from "node:fs";

type InteractionCallback = (
  interaction: ChatInputCommandInteraction<CacheType>,
) => Promise<void>;

const rest = new REST().setToken(config.token);

export class CommandRegistry {
  private _JSONCommands: any[] = [];
  private _commands: Map<string, CommandBuilder> = new Map();
  constructor() {}

  public add(command: any): void {
    const data: CommandBuilder = command["data"];
    this._JSONCommands.push(data.toJSON());
    this._commands.set(data.name, data);
  }

  public get JSONCommands(): any[] {
    return this._JSONCommands;
  }

  public get commands(): Map<string, CommandBuilder> {
    return this._commands;
  }

  public update(): void {
    // wait for every file to be read and added
    const scan = new Promise((res, err) => {
      readdir("./dist/bot-interface/commands/", async (error, files) => {
        console.log(files);
        if (error !== null) {
          err(error);
        }
        try {
          const commandFiles = files.filter((file) => file.endsWith(".js"));
          console.log(`[CommandRegistry] Found files: ${commandFiles}`);

          // iterate through all files that were found in the commands folder
          for (const file of commandFiles) {
            const command = await import("./commands/" + file);
            this.add(command);
          }

          res(true);
        } catch (e) {
          err(e);
        }
      });
    });

    scan.then(async () => {
      if (client.user === null) return;
      // make put requrst for all the application commands
      console.log(this._JSONCommands);
      await rest.put(Routes.applicationCommands(client.user.id), {
        body: this._JSONCommands,
      });
    });
  }

  public getCommand(name: string): Readonly<CommandBuilder> {
    if (!this._commands.has(name)) {
      throw new ReferenceError(
        "Tried to get a command that does not exist within the command registry: (" +
          name +
          ")",
      );
    }
    return this._commands.get(name) as CommandBuilder;
  }
}

export class CommandBuilder extends SlashCommandBuilder {
  #_execute: InteractionCallback | undefined;
  constructor() {
    super();
  }
  /**
   * Requires isChatInputCommand to be checked in order to use interaction message functions
   * @param func
   */
  public setExecute(func: InteractionCallback): this {
    this.#_execute = func;
    return this;
  }

  public execute(interaction: ChatInputCommandInteraction<CacheType>) {
    if (!this.#_execute) {
      throw new ReferenceError(
        "Cannot run execute function on a callback that does not exist. Interaction Name: " +
          this.name,
      );
    }
    this.#_execute(interaction);
  }

  public override setName(name: string): this {
    super.setName(name);
    return this;
  }

  public override setDefaultMemberPermissions(
    permissions: Permissions | bigint | number | null | undefined,
  ): this {
    super.setDefaultMemberPermissions(permissions);
    return this;
  }

  public override setDescriptionLocalization(
    locale: LocaleString,
    localizedDescription: string | null,
  ): this {
    super.setDescriptionLocalization(locale, localizedDescription);
    return this;
  }

  public override setNSFW(nsfw?: boolean): this {
    super.setNSFW(nsfw);
    return this;
  }

  public override setDescriptionLocalizations(
    localizedDescriptions: LocalizationMap | null,
  ): this {
    super.setDescriptionLocalizations(localizedDescriptions);
    return this;
  }

  public override setIntegrationTypes(
    ...integrationTypes: RestOrArray<ApplicationIntegrationType>
  ): this {
    super.setIntegrationTypes(...integrationTypes);
    return this;
  }

  public override addAttachmentOption(
    input:
      | SlashCommandAttachmentOption
      | ((
          builder: SlashCommandAttachmentOption,
        ) => SlashCommandAttachmentOption),
  ): this {
    super.addAttachmentOption(input);
    return this;
  }

  public override addBooleanOption(
    input:
      | SlashCommandBooleanOption
      | ((builder: SlashCommandBooleanOption) => SlashCommandBooleanOption),
  ): this {
    super.addBooleanOption(input);
    return this;
  }

  public override addChannelOption(
    input:
      | SlashCommandChannelOption
      | ((builder: SlashCommandChannelOption) => SlashCommandChannelOption),
  ): this {
    super.addChannelOption(input);
    return this;
  }

  public override addIntegerOption(
    input:
      | SlashCommandIntegerOption
      | ((builder: SlashCommandIntegerOption) => SlashCommandIntegerOption),
  ): this {
    super.addIntegerOption(input);
    return this;
  }

  public override addMentionableOption(
    input:
      | SlashCommandMentionableOption
      | ((
          builder: SlashCommandMentionableOption,
        ) => SlashCommandMentionableOption),
  ): this {
    super.addMentionableOption(input);
    return this;
  }

  public override addNumberOption(
    input:
      | SlashCommandNumberOption
      | ((builder: SlashCommandNumberOption) => SlashCommandNumberOption),
  ): this {
    super.addNumberOption(input);
    return this;
  }

  public override addRoleOption(
    input:
      | SlashCommandRoleOption
      | ((builder: SlashCommandRoleOption) => SlashCommandRoleOption),
  ): this {
    super.addRoleOption(input);
    return this;
  }

  public override addStringOption(
    input:
      | SlashCommandStringOption
      | ((builder: SlashCommandStringOption) => SlashCommandStringOption),
  ): this {
    super.addStringOption(input);
    return this;
  }

  public override addSubcommand(
    input:
      | SlashCommandSubcommandBuilder
      | ((
          subcommandGroup: SlashCommandSubcommandBuilder,
        ) => SlashCommandSubcommandBuilder),
  ): SlashCommandSubcommandsOnlyBuilder {
    super.addSubcommand(input);
    return this;
  }

  public override addSubcommandGroup(
    input:
      | SlashCommandSubcommandGroupBuilder
      | ((
          subcommandGroup: SlashCommandSubcommandGroupBuilder,
        ) => SlashCommandSubcommandGroupBuilder),
  ): SlashCommandSubcommandsOnlyBuilder {
    super.addSubcommandGroup(input);
    return this;
  }

  public override addUserOption(
    input:
      | SlashCommandUserOption
      | ((builder: SlashCommandUserOption) => SlashCommandUserOption),
  ): this {
    super.addUserOption(input);
    return this;
  }

  public override setNameLocalization(
    locale: LocaleString,
    localizedName: string | null,
  ): this {
    super.setNameLocalization(locale, localizedName);
    return this;
  }

  public override setNameLocalizations(
    localizedNames: LocalizationMap | null,
  ): this {
    super.setNameLocalizations(localizedNames);
    return this;
  }

  public setContexts(...contexts: RestOrArray<InteractionContextType>): this {
    super.setContexts(...contexts);
    return this;
  }

  public setDescription(description: string): this {
    super.setDescription(description);
    return this;
  }
}
