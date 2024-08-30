import { sql } from "~~/server/db";

export type UsersModel = {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string;
  lesson_passed: string;
  last_lesson: string;
  xp: number;
  role: string;
  email_verify: number;
  token: string;
};

export const read = async () => {
  const result = await sql({
    query: "SELECT * FROM users",
  });

  return result;
};

export const getLeaderboard = async () => {
  const result = await sql({
    query: "SELECT * FROM users ORDER BY xp DESC LIMIT 10",
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

export const getDataWithToken = async (token: string) => {
  const result = await sql({
    query: "SELECT * FROM users WHERE token = ?",
    values: [token],
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
  data: Pick<UsersModel, "id" | "name" | "email" | "password" | "token">
) => {
  const result = await sql({
    query:
      "INSERT INTO users (id_user, name, email, password, image, last_lesson, lesson_passed, xp, role, email_verify, token) VALUES (?, ?, ?, ?, 'user.png', 'definisi-alquran', '[]', 0, 'student', 0, ?)",
    values: [data.id, data.name, data.email, data.password, data.token],
  });
  return result;
};

export const update = async (
  id: string,
  data: Pick<UsersModel, "id" | "name" | "email" | "password">
) => {
  const results = await sql({
    query:
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id_user = ?",
    values: [data.name, data.email, data.password, id],
  });
  return results;
};

export const updateImage = async (
  id: string,
  data: Pick<UsersModel, "image">
) => {
  const results = await sql({
    query: "UPDATE users SET image = ? WHERE id_user = ?",
    values: [data.image, id],
  });
  return results;
};

export const updateLessonPassed = async (
  id: string,
  data: Pick<UsersModel, "lesson_passed">
) => {
  await sql({
    query: "UPDATE users SET lesson_passed = ? WHERE id_user = ?",
    values: [data.lesson_passed, id],
  });
};

export const updateLesson = async (
  id: string,
  data: Pick<UsersModel, "last_lesson" | "xp">
) => {
  await sql({
    query: "UPDATE users SET last_lesson = ?, xp = ? WHERE id_user = ?",
    values: [data.last_lesson, data.xp, id],
  });
};

export const emailVerify = async (
  token: string,
  data: Pick<UsersModel, "email_verify">
) => {
  const result = await sql({
    query: "UPDATE users SET email_verify = ? WHERE token = ?",
    values: [data.email_verify, token],
  });
  return result;
};

export const remove = async (id: string) => {
  const results = await sql({
    query: "DELETE FROM users WHERE id_user = ?",
    values: [id],
  });

  return results;
};
