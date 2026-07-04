import { Table } from "./TableBuilder.js";

process.once("atlaspreinit", (a) => {
  a.mount(
    new Table({
      name: "guilds",
      fields: [
        {
          pk: true,
          name: "guild_id",
          type: "INTEGER",
        },
        {
          required: true,
          name: "owner_id",
          type: "INTEGER",
        },
        {
          required: true,
          name: "guild_name",
          type: "TEXT",
        },
        {
          name: "icon_hash",
          type: "TEXT"
        },
        {
          name: "banner_hash",
          type: "TEXT"
        },
        {
          name: "vanity_url",
          type: "TEXT"
        }
      ],
    }),
  );
});
