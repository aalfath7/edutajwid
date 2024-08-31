import { createPool } from "mysql2/promise";
import mysql from "mysql2";

interface Options {
  query: string;
  values?: any[];
}

const con = createPool({
  host: "localhost",
  user: "root",
  database: "edutajwid",
  password: "",
});

export const sql = async ({ query, values }: Options) => {
  try {
    const [results, fields] = await con.query(query, values);
    return { results, fields, error: null };
  } catch (error) {
    return { results: null, fields: null, error };
  }
};
