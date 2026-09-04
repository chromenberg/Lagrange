import { Table } from "./TableBuilder.js";

process.once("atlaspreinit", (a) => {
  a.mount(
    new Table({
      name: "channels",
      fields: [
        { name: "channel_id", type: "INTEGER", pk: true },
        { name: "guild_id", type: "INTEGER", required: true },
        { name: "channel_name", type: "TEXT", required: true },
        { name: "channel_index", type: "INTEGER" },
        { name: "channel_type", type: "INTEGER" },
        { name: "channel_flags", type: "INTEGER" },
        { name: "channel_topic", type: "TEXT" },
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
