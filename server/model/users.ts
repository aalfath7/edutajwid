import { sql } from "~~/server/db";

export type UsersModel = {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string;
  last_lesson: string;
  points: number;
  role: string;
};

export const read = async () => {
  const result = await sql({
    query: "SELECT * FROM users",
  });

  return result;
};

export const getLeaderboard = async () => {
  const result = await sql({
    query: "SELECT * FROM users ORDER BY points DESC LIMIT 10",
  });

  return result;
};

export const detail = async (id: string) => {
  const result = await sql({
    query: "SELECT * FROM users WHERE id_user = ?",
    values: [id],
  });
  return result;
};

export const getDataWithEmail = async (email: string) => {
  const result = await sql({
    query: "SELECT * FROM users WHERE email = ?",
    values: [email],
  });
  return result;
};

export const login = async (data: Pick<UsersModel, "email" | "password">) => {
  const result = await sql({
    query: "SELECT * FROM users WHERE email = ? AND password = ?",
    values: [data.email, data.password],
  });
  return result;
};

export const create = async (
  data: Pick<UsersModel, "id" | "name" | "email" | "password" | "role">
) => {
  const result = await sql({
    query:
      "INSERT INTO users (id_user, name, email, password, image, last_lesson, points, role) VALUES (?, ?, ?, ?, 'user.png', 'pendahuluan-tentang-alquran-alkarim', 0, ?)",
    values: [data.id, data.name, data.email, data.password, data.role],
  });
  return result;
};

export const update = async (
  id: string,
  data: Pick<UsersModel, "id" | "name" | "email" | "password">
) => {
  await sql({
    query: "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
    values: [data.name, data.email, data.password, id],
  });
};

export const updateLesson = async (
  id: string,
  data: Pick<UsersModel, "last_lesson" | "points">
) => {
  await sql({
    query: "UPDATE users SET last_lesson = ?, points = ? WHERE id_user = ?",
    values: [data.last_lesson, data.points, id],
  });
};

export const remove = async (id: string) => {
  try {
    await sql({
      query: "DELETE FROM users WHERE id=?",
      values: [id],
    });

    return true;
  } catch (error) {
    return false;
  }
};
