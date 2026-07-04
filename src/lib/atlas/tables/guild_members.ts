import { Table } from "./TableBuilder.js";
process.once("atlaspreinit", (a) => {
  a.mount(
    new Table({
      name: "guild_members",
      fields: [
        {
          name: "user_id",
          type: "INTEGER",
          reference: {
            table: "users",
            field: "user_id",
          },
        },
        {
          name: "guild_id",
          type: "INTEGER",
          reference: {
            table: "guilds",
            field: "guild_id",
          },
        },
        {
          name: "nickname",
          type: "TEXT",
        },
        {
          name: "bio",
          type: "TEXT"
        },
        {
          name: "pronouns",
          type: "TEXT"
        },
        {
          name: "banner_hash",
          type: "TEXT",
        },
        {
          name: "avatar_hash",
          type: "TEXT",
        },
      ],
      shared_pk: ["guild_id", "user_id"],
    }),
  );
});
