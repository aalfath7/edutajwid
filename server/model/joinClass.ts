import { sql } from "~~/server/db";

export type joinClassModel = {
  id: number;
  id_class: number;
  id_user: number;
};

export const read = async () => {
  const result = await sql({
    query: "SELECT * FROM join_class",
  });
  return result;
};

export const detail = async (id: string) => {
  const result = await sql({
    query: `SELECT id_joinclass, users.name AS user_name, class.name AS class_name
            FROM join_class
            INNER JOIN users ON join_class.id_user = users.id_user
            INNER JOIN class ON join_class.id_class = class.id_class
            WHERE class.id_class = ?`,
    values: [id],
  });
  return result;
};

export const create = async (
  data: Pick<joinClassModel, "id" | "id_class" | "id_user">
) => {
  const result = await sql({
    query:
      "INSERT INTO join_class (id_joinclass, id_class, id_user) VALUES (?, ?, ?)",
    values: [data.id, data.id_class, data.id_user],
  });
  return result;
};

export const update = async (
  id: string,
  data: Pick<joinClassModel, "id" | "id_class" | "id_user">
) => {
  const result = await sql({
    query: "UPDATE join_class SET name = ? WHERE id = ?",
    values: [data.id, data.id_class, data.id_user, id],
  });
  return result;
};

export const remove = async (id: string) => {
  const result = await sql({
    query: "DELETE FROM join_class WHERE id_joinclass = ?",
    values: [id],
  });

  return result;
};
