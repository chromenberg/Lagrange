import type { GuildCreateObj } from "../../../lagrange/interfaces/Guilds.js";
import type { Atlas } from "../../AtlasManager.js";
import type {
  ChannelData,
  GuildData,
} from "../../../core/types/FeatureTypes.js";
import type { UnavailableID } from "../../../core/types/GatewayTypes.js";
import type { Snowflake, SQLPromiseArray } from "../../../core/types/Types.js";
import { AtlasDB } from "../../Configs/Config.js";
import { SnowflakeNode, WorkerIDs } from "../snowflake/Snowflake.js";
import { AtlasService } from "../client/AtlasChild.js";
import { GuildTemplate } from "../templates/GuildTemplate.js";
import { AtlasEvents } from "../../AtlasEvents.js";
import type { Guild, Role } from "../../../core/types/GuildTypes.js";
import type {
  Channel,
  PartialChannel,
} from "../../../core/types/ChannelTypes.js";

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

  public async validateGuildID(id: Snowflake): Promise<boolean> {
    return (
      await this.sql
        .get`SELECT guild_id FROM guilds WHERE guild_id = ${BigInt(id)}`
    )?.guild_id
      ? true
      : false;
  }

  public async addGuildMember(
    guildID: Snowflake,
    userID: Snowflake,
  ): Promise<void> {
    this.parent.sqlClient
      .run`INSERT INTO guild_members VALUES (${BigInt(userID)}, ${BigInt(guildID)}, null, null, null, null, null);`;
  }

  public async removeGuildMember(
    guildID: Snowflake,
    userID: Snowflake,
  ): Promise<void> {
    this.sql
      .run`DELETE FROM guild_members WHERE guild_id = ${BigInt(guildID)} AND user_id = ${BigInt(userID)};`;
  }

  public async getAllGuilds(): SQLPromiseArray {
    return this.parent.sqlClient.all`SELECT * FROM guilds;`;
  }

  public async newGuild(data: GuildData): Promise<GuildTemplate> {
    return new Promise(async (res) => {
      // Populate the id of the guild
      data.id = this.snowflake.GenerateID().toString();
      console.log(data);
      await this.parent.sqlClient
        .run`INSERT INTO guilds VALUES (${BigInt(data.id)}, ${BigInt(data.owner_id)}, ${data.name}, null, null, null);`;

      // this.parent.emit(AtlasEvents.guildCreate, data.id, data.owner_id)

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

      // Add the owner of the server into guild members
      this.addGuildMember(data.id, data.owner_id);

      res(
        new GuildTemplate(
          data.id,
          data.owner_id,
          [await channel, await channel2],
          data.name,
        ),
      );
    });
  }

  public toUnavailableGuild(id: bigint | Snowflake): UnavailableID {
    return {
      id: id.toString(),
      unavailable: true,
    };
  }

  public async getAllGuildChannels() {
    return this.parent.sqlClient
      .all`SELECT guilds.guild_id, channels.channel_id, channels.guild_id FROM guilds LEFT JOIN channels ON guilds.guild_id = channels.guild_id;`;
  }

  public checkInvite(code: string) {
    return this.parent.sqlClient
      .get`SELECT guild_invites.guild_id, guilds.guild_name, guild_invites.invite_code
      FROM guild_invites, guilds WHERE guild_invites.invite_code = ${code};`;
  }

  public newInvite(guild_id: string) {
    const code = btoa(this.snowflake.GenerateID().toBase64());
    this.parent.sqlClient
      .run`INSERT INTO guild_invites VALUES (${code}, ${BigInt(guild_id)});`;
    return code;
  }

  public getChannels(id: Snowflake) {
    return this.parent.sqlClient
      .all`SELECT * FROM channels WHERE channels.guild_id = ${id}`;
  }

  public async getGuildRoles(id: Snowflake) {
    const roles = await this.sql
      .all`SELECT * FROM guild_roles WHERE guild_id = ${BigInt(id)}`;
    return roles?.map((role) => {
      return {
        color: String(role?.role_color),
        hoist: Boolean(role?.hoist) ?? false,
        mentionable: Boolean(role?.mentionable) ?? false,
        permissions: String(role?.permissions),
        name: String(role?.name),
        id: String(role?.id),
        colors: undefined,
        flags: undefined,
        icon: undefined,
        managed: false,
        position: 0,
      };
    });
  }

  public async getGuildInfo(id: Snowflake): Promise<Partial<Guild>> {
    const data = await this.sql
      .get`SELECT * FROM guilds WHERE guild_id = ${BigInt(id)}`;

    // TODO: Rewrite this
    const channelData: Channel[] | undefined = (
      await this.getChannels(id)
    )?.map((channel): Channel => {
      return {
        guild_id: id,
        name: channel?.name?.toString() as string,
        id: channel?.id?.toString() as string,
        position: channel?.index as number,
        type: channel?.type as number,
        flags: 0,
        permission_overwrites: [],
      };
    });

    if (!channelData) throw new Error("aaaaaa");

    const roleData = (await this.getGuildRoles(id)) ?? [];
    console.log(roleData);
    const guildData: Partial<Guild> = {};

    guildData.id = data?.guild_id?.toString();
    guildData.channels = channelData;
    (guildData.roles as Partial<Role>[]) = roleData;
    guildData.properties = {
      name: data?.guild_name as string,
      icon: data?.icon_hash?.toString() ?? null,
      owner_id: data?.owner_id?.toString() as string,
      banner: data?.banner_hash?.toString() ?? null,
      vanity_url_code: data?.vanity_url?.toString() ?? null,
      description: null,
    };

    return guildData;
  }
}
