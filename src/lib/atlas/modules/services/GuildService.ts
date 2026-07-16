import type { GuildCreateObj } from "../../../lagrange/interfaces/Guilds.js";
import type { Atlas } from "../../AtlasManager.js";
import type { GuildData } from "../../../core/types/FeatureTypes.js";
import type { UnavailableID } from "../../../core/types/GatewayTypes.js";
import type { Snowflake, SQLPromiseArray } from "../../../core/types/Types.js";
import { AtlasDB } from "../../Configs/Config.js";
import { SnowflakeNode, WorkerIDs } from "../snowflake/Snowflake.js";
import { AtlasService } from "../client/AtlasChild.js";
import { GuildTemplate } from "../templates/GuildTemplate.js";

export class GuildService extends AtlasService {
  protected snowflake: SnowflakeNode;
  constructor(parent: Atlas, snowflake?: SnowflakeNode) {
    super(parent);

    // If we havent given the user service a snowflake node already then we will generate one
    // with the defaults for a user service
    this.snowflake = snowflake
      ? snowflake
      : SnowflakeNode({
          workerBits: 10,
          workerID: WorkerIDs.GUILD_SERVICE,
          sequenceBits: 13,
          // user ids should be represented as strings in JS to prevent conversion
          startEpoch: AtlasDB.Snowflake.StartEpoch,
        });
  }

  public async addGuildMember(
    guildID: Snowflake,
    userID: Snowflake,
  ): Promise<void> {
    this.parent.sqlClient
      .run`INSERT INTO guild_members VALUES (${BigInt(userID)}, ${BigInt(guildID)});`;
  }

  public async getAllGuilds(): SQLPromiseArray {
    return this.parent.sqlClient.all`SELECT * FROM guilds;`;
  }

  public async newGuild(data: GuildData): Promise<void> {
    // Populate the id of the guild
    data.id = this.snowflake.GenerateID().toString();
    console.log(data);
    await this.parent.sqlClient
      .run`INSERT INTO guilds VALUES (${BigInt(data.id)}, ${BigInt(data.owner_id)}, ${data.name}, null, null, null);`;
    // Create a new channel in the database
    const channel = this.parent.requests.channels.newChannel(
      {
        channel_index: 0,
        name: "general",
        id: "",
      },
      data.id, // this is the guild id being passed into the channel
    );
    const channel2 = this.parent.requests.channels.newChannel(
      {
        channel_index: 1,
        name: "off-topic",
        id: "",
      },
      data.id, // this is the guild id being passed into the channel
    );

    new GuildTemplate(data.id, data.owner_id, [await channel, await channel2], data.name);

    // Add the owner of the server into guild members
    this.addGuildMember(data.id, data.owner_id);
  }

  public toUnavailableGuild(id: bigint | Snowflake): UnavailableID {
    return {
      id: id.toString(),
      unavailable: true,
    };
  }

  public async getAllGuildChannels() {
    return this.parent.sqlClient.all`SELECT guilds.guild_id, channels.channel_id, channels.guild_id FROM guilds LEFT JOIN channels ON guilds.guild_id = channels.guild_id;`
  }

  public checkInvite(code: string) {
    return this.parent.sqlClient.get`SELECT guild_invites.guild_id, guilds.guild_name, guild_invites.invite_code 
      FROM guild_invites, guilds WHERE guild_invites.invite_code = ${code};`
  }
  
  public newInvite(guild_id: string) {
    const code = btoa(this.snowflake.GenerateID().toBase64())
    this.parent.sqlClient.run`INSERT INTO guild_invites VALUES (${code}, ${BigInt(guild_id)});`
    return code
  }

  public getChannels(id: Snowflake) {
    return this.parent.sqlClient.all`SELECT * FROM channels WHERE channels.guild_id = ${id}`
  }
}
