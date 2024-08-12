import { sql } from "~~/server/db";

export type classModel = {
  id: number;
  name: string;
  school_name: string;
  number_of_students: number;
  teacher: string;
  class_code: string;
};

export const read = async () => {
  const result = await sql({
    query: "SELECT * FROM class",
  });

  return result;
};

export const getClass = async (teacher: string) => {
  const result = await sql({
    query: `SELECT * FROM class WHERE teacher = ?`,
    values: [teacher],
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
    "id" | "name" | "school_name" | "teacher" | "class_code"
  >
) => {
  const result = await sql({
    query:
      "INSERT INTO class (id_class, name, school_name, number_of_students, teacher, class_code) VALUES (?, ?, ?, 0, ?, ?)",
    values: [
      data.id,
      data.name,
      data.school_name,
      data.teacher,
      data.class_code,
    ],
  });
  return result;
};

export const update = async (
  code: string,
  data: Pick<classModel, "id" | "name" | "school_name" | "teacher">
) => {
  const result = await sql({
    query:
      "UPDATE class SET name = ?, school_name = ?, teacher = ? WHERE class_code = ?",
    values: [data.name, data.school_name, data.teacher, code],
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
