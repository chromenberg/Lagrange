import { Table } from "./TableBuilder.js";

process.once("atlaspreinit", (a) => {
  a.mount(
    new Table({
      name: "relationships",
      fields: [
        {
          name: "user_id1",
          type: "INTEGER",
          reference: {
            table: "users",
            field: "user_id",
          },
        },
        {
          name: "user_id2",
          type: "INTEGER",
          reference: {
            table: "users",
            field: "user_id",
          },
        },
        {
          name: "nickname",
          type: "TEXT",
          required: false,
        },
        {
          name: "relation_type",
          type: "TINYINT",
          required: true,
        },
        {
          name: "related_since",
          type: "DATETIME",
          required: true,
        },
      ],
      shared_pk: ["user_id1", "user_id2"],
    }),
  );
});
