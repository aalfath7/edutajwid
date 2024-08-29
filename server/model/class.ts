import { sql } from "~~/server/db";

export type classModel = {
  id_class: number;
  id_user: number;
  name: string;
  school_name: string;
  number_of_students: number;
  class_code: string;
};

export const read = async () => {
  const result = await sql({
    query: "SELECT * FROM class",
  });

  return result;
};

export const getClass = async (id_user: string) => {
  const result = await sql({
    query: `SELECT * FROM class WHERE id_user = ?`,
    values: [id_user],
  });
  return result;
};

export const detail = async (code: string) => {
  const result = await sql({
    query: `SELECT * FROM class WHERE class_code = ?`,
    values: [code],
  });
  return result;
};

export const create = async (
  data: Pick<
    classModel,
    "id_class" | "id_user" | "name" | "school_name" | "class_code"
  >
) => {
  const result = await sql({
    query:
      "INSERT INTO class (id_class, id_user, name, school_name, number_of_students, class_code) VALUES (?, ?, ?, ?, 0, ?)",
    values: [
      data.id_class,
      data.id_user,
      data.name,
      data.school_name,
      data.class_code,
    ],
  });
  return result;
};

export const update = async (
  code: string,
  data: Pick<classModel, "id_class" | "id_user" | "name" | "school_name">
) => {
  const result = await sql({
    query:
      "UPDATE class SET id_user = ? , name = ?, school_name = ? WHERE class_code = ?",
    values: [data.id_user, data.name, data.school_name, code],
  });
  return result;
};

export const updateStudents = async (
  code: string,
  data: Pick<classModel, "number_of_students">
) => {
  const result = await sql({
    query: "UPDATE class SET number_of_students = ? WHERE class_code = ?",
    values: [data.number_of_students, code],
  });
  return result;
};

export const remove = async (code: string) => {
  const result = await sql({
    query: "DELETE FROM class WHERE class_code = ?",
    values: [code],
  });
  return result;
};
