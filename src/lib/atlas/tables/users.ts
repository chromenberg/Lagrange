import { Table } from "./TableBuilder.js";

process.once("atlaspreinit", (a) => {
  a.mount(
    new Table({
      name: "users",
      fields: [
        {
          // required: true,
          pk: true,
          name: "user_id",
          type: "INTEGER",
        },
        {
          required: true,
          name: "email",
          type: "TEXT",
        },
        {
          required: true,
          name: "password",
          type: "TEXT",
        },
        {
          required: true,
          name: "token",
          type: "TEXT",
        },
        {
          required: true,
          name: "username",
          type: "TEXT",
        },
        {
          name: "display_name",
          type: "TEXT",
        },
        {
          name: "bio",
          type: "TEXT",
        },
        {
          name: "pronouns",
          type: "TEXT",
        },
      ],
      // pk: ["user_id"],
    }),
  );
});
