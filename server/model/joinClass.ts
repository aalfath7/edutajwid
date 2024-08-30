import { sql } from "~~/server/db";

export type joinClassModel = {
  id: number;
  id_class: number;
  id_user: number;
  status: string;
};

export const read = async () => {
  const result = await sql({
    query: "SELECT * FROM join_class",
  });
  return result;
};

export const detail = async (id: string) => {
  const result = await sql({
    query: `SELECT join_class.id_joinclass, users.name AS user_name, class.name AS class_name, 
            class.school_name, class.class_code, class.id_class, class.id_user
            FROM join_class
            INNER JOIN users ON join_class.id_user = users.id_user
            INNER JOIN class ON join_class.id_class = class.id_class
            WHERE class.id_class = ? and join_class.status = 'accepted'`,
    values: [id],
  });
  return result;
};

export const getStudentClass = async (id: string) => {
  const result = await sql({
    query: `SELECT join_class.id_joinclass, class.class_code
            FROM join_class
            INNER JOIN users ON join_class.id_user = users.id_user
            INNER JOIN class ON join_class.id_class = class.id_class
            WHERE join_class.id_user = ?
            AND join_class.status = 'accepted'`,
    values: [id],
  });
  return result;
};

export const getTeachersRequest = async (id: string) => {
  const result = await sql({
    query: `SELECT join_class.id_joinclass, users.name AS user_name, class.name AS class_name
            FROM join_class
            INNER JOIN users ON join_class.id_user = users.id_user
            INNER JOIN class ON join_class.id_class = class.id_class
            WHERE class.id_class = ? and join_class.status = 'teachers request'`,
    values: [id],
  });
  return result;
};

export const getTeachersRequestByIdUser = async (id: string) => {
  const result = await sql({
    query: `SELECT join_class.id_joinclass, users.name AS user_name, class.name AS class_name, 
            class.school_name, class.class_code, class.id_class, class.id_user
            FROM join_class
            INNER JOIN users ON join_class.id_user = users.id_user
            INNER JOIN class ON join_class.id_class = class.id_class
            WHERE join_class.id_user = ? and join_class.status = 'teachers request'`,
    values: [id],
  });
  return result;
};

export const getStudentsRequest = async (id: string) => {
  const result = await sql({
    query: `SELECT join_class.id_joinclass, users.name AS user_name, class.name AS class_name
            FROM join_class
            INNER JOIN users ON join_class.id_user = users.id_user
            INNER JOIN class ON join_class.id_class = class.id_class
            WHERE class.id_class = ? and join_class.status = 'students request'`,
    values: [id],
  });
  return result;
};

export const getStudentsRequestByIdUser = async (id: string) => {
  const result = await sql({
    query: `SELECT join_class.id_joinclass, users.name AS user_name, class.name AS class_name
            FROM join_class
            INNER JOIN users ON join_class.id_user = users.id_user
            INNER JOIN class ON join_class.id_class = class.id_class
            WHERE join_class.id_user = ? and join_class.status = 'students request'`,
    values: [id],
  });
  return result;
};

export const studentProgress = async (id: string) => {
  const result = await sql({
    query: `SELECT 
                users.id_user, 
                users.name, 
                users.email, 
                users.password, 
                users.image, 
                users.last_lesson, 
                users.lesson_passed, 
                users.xp, 
                users.role, 
                join_class.id_joinclass, 
                join_class.id_class
            FROM 
                users
            INNER JOIN 
                join_class 
            ON 
                users.id_user = join_class.id_user
            WHERE 
                join_class.id_class = ?;
            `,
    values: [id],
  });
  return result;
};

export const create = async (
  data: Pick<joinClassModel, "id" | "id_class" | "id_user" | "status">
) => {
  const result = await sql({
    query:
      "INSERT INTO join_class (id_joinclass, id_class, id_user, status) VALUES (?, ?, ?, ?)",
    values: [data.id, data.id_class, data.id_user, data.status],
  });
  return result;
};

export const update = async (
  id: string,
  data: Pick<joinClassModel, "status">
) => {
  const result = await sql({
    query: "UPDATE join_class SET status = ? WHERE id_joinclass = ?",
    values: [data.status, id],
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
