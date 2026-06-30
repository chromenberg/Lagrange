import { Table } from "./TableBuilder.js";

process.once("atlaspreinit", (a) => {
  a.mount(
    new Table({
      name: "guild_roles",
      fields: [
        { name: "role_id", type: "INTEGER", pk: true },
        { name: "guild_id", type: "INTEGER" },
        { name: "role_name", type: "text" },
        { name: "role_color", type: "INTEGER" },
        { name: "role_index", type: "INTEGER" },
        { name: "permissions", type: "BINARY" },
        { name: "hoist", type: "BOOL" },
        { name: "mentionable", type: "BOOL" },
      ],
      references: [
        {
          fieldName: "guild_id",
          referenceField: "guild_id",
          referenceTable: "guilds",
          fk: true,
        },
      ],
    }),
  );
});
