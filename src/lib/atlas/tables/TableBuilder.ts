import type { WeakObj } from "../../core/types/Types.js";
type FieldData = {
  name: string;
  type: string;
  pk?: boolean;
  required?: boolean;
  reference?: { table: string; field: string };
};
type ReferenceData = {
  fk?: boolean;
  fieldName: string;
  referenceTable: string;
  referenceField: string;
};
type PrimaryKeyData = string[];

type TableData = {
  name: string;
  fields: FieldData[];
  shared_pk?: PrimaryKeyData;
  references?: ReferenceData[];
};

export class Table {
  private _data: TableData;
  constructor(data: TableData) {
    this._data = data;
  }

  public toString() {
    let str = "";
    str += "CREATE TABLE IF NOT EXISTS ";
    str += this._data.name + " (\n";

    const fields = this._data.fields.map((field) => {
      return `  ${field.name} ${field.type}` +
        (field.pk ? " PRIMARY KEY" : "") +
        (field.required ? " NOT NULL" : "") +
        (field.reference
        ? ` REFERENCES ${field.reference?.table}(${field.reference?.field})`
        : "");
    });

    const references = this._data.references?.map((field) => {
      return `  ${field.fk ? "FOREIGN KEY" : ""} ${field.fieldName} REFERENCES ${field.referenceTable}(${field.referenceField})`;
    });

    if (references) {
      fields.concat(references);
    }
    if (this._data.shared_pk) {
      fields.push(`  PRIMARY KEY (${this._data.shared_pk.join(", ")})\n`);
    }
    str += fields.join(", \n") + "\n);\n";

    return str;
  }

  public get name(): string {
    return this._data.name;
  }
}
