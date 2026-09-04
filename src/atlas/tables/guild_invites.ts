import { Table } from "./TableBuilder.js";

process.once("atlaspreinit", (a) => {
  a.mount(
    new Table({
      name: "guild_invites",
      fields: [
        {
          pk: true,
          name: "invite_code",
          type: "TEXT",
        },
        {
          required: true,
          name: "guild_id",
          type: "INTEGER",
          reference: {
            table: "guilds",
            field: "guild_id"
          }
        }
      ],
    }),
  );
});
