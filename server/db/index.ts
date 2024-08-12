import { createPool } from "mysql2/promise";
import mysql from "mysql2";

interface Options {
  query: string;
  values?: any[];
}

const con = createPool({
  host: "localhost",
  user: "root",
  database: "edutajwid_db",
  password: "",
});

export const sql = async ({ query, values }: Options) => {
  // return await con.query(query, values);
  try {
    const [results, fields] = await con.query(query, values);
    return { results, fields, error: null }; // Kembalikan hasil query dan null untuk error
  } catch (error) {
    return { results: null, fields: null, error }; // Kembalikan null untuk hasil dan error yang ditangkap
  }
};
