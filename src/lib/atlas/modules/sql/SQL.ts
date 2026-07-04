import {
  DatabaseSync,
  type SQLInputValue,
  type SQLOutputValue,
  type SQLTagStore,
  type StatementResultingChanges,
} from "node:sqlite";
import type { Atlas } from "../../AtlasManager.js";

import type {
  SQLPromise,
  SQLPromiseArray,
  SQLPromiseIterator,
} from "../../../core/types/Types.js";

export class SQLDatabase {
  private readonly _db: DatabaseSync;
  private readonly parent: Atlas;
  private readonly tagStore: SQLTagStore;
  constructor(parent: Atlas, database: DatabaseSync) {
    this._db = database;
    this.parent = parent;
    this.tagStore = this._db.createTagStore();
    
  }

  /**
   * Runs a SQL command through the database without returning a result and does not store the query.
   */
  public exec(query: string) {
    this._db.exec(query);
  }

  /**
   * Runs a query that is not expected return results (insertion etc)
   * @param query
   */
  public async run(
    query: TemplateStringsArray,
    ...args: SQLInputValue[]
  ): Promise<StatementResultingChanges> {
    return new Promise((res) => {
      res(this.tagStore.run(query, ...args));
    });
  }

  /**
   * Runs a query that is expected to return a row of results (a single result)
   * @param query
   */
  public async get(
    query: TemplateStringsArray,
    ...args: SQLInputValue[]
  ): SQLPromise {
    return new Promise((res) => {
      res(this.tagStore.get(query, ...args));
    });
  }

  public async has(
    table: string,
    values: { name: string; value: any }[],
  ): Promise<boolean> {
    return new Promise((res) => {
      const whereClause = values
        .map((pair) => {
          return `${pair.name} = ${pair.value}`;
        })
        .join(" AND ");

      this.get`SELECT * FROM ${table} WHERE ${whereClause};`.then((response) =>
        res(response ? true : false),
      );
    });
  }

  /**
   * Runs a query that returns all values that match the query
   * @param query
   */
  public async all(
    query: TemplateStringsArray,
    ...args: SQLInputValue[]
  ): SQLPromiseArray {
    return new Promise((res) => {
      res(this.tagStore.all(query, ...args));
    });
  }

  /**
   * Runs a query that returns an iterator of the results
   * @param query
   */
  public async iterator(
    query: TemplateStringsArray,
    ...args: SQLInputValue[]
  ): SQLPromiseIterator {
    return new Promise((res) => {
      res(this.tagStore.iterate(query, ...args));
    });
  }

  /**
   * Converts all BigInt values in a result into strings which are safe to use in JavaScript and JSON
   * @param data
   * @returns
   */
  public static toSafeJS(data: { [key: string]: any }): SQLPromise {
    return new Promise((res, err) => {
      const dataEntries = Object.entries(data).map(([key, value]) => {
        if (typeof value === "bigint") {
          return [key, value.toString()]; // convert bigint into string for JSON.Stringify and JS safety
        } else {
          return [key, value];
        }
      }) as [string, any][];

      res(Object.fromEntries(dataEntries));
    });
  }
}
