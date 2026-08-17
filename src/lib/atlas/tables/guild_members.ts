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
          required: false,
        },
        {
          name: "bio",
          type: "TEXT",
          required: false,
        },
        {
          name: "pronouns",
          type: "TEXT",
          required: false,
        },
        {
          name: "banner_hash",
          type: "TEXT",
          required: false,
        },
        {
          name: "avatar_hash",
          type: "TEXT",
          required: false,
        },
      ],
      shared_pk: ["guild_id", "user_id"],
    }),
  );
});
