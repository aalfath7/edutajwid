import { sql } from "~~/server/db";

export type LessonsModel = {
  // id: number;
  // name: string;
  // email: string;
  // password: string;
  // image: string;
  // last_lesson: number;
  // xp: number;
  // role: string;
};

export const read = async () => {
  const result = await sql({
    query: "SELECT * FROM lessons",
  });

  return result;
};

export const getBasicLevel = async () => {
  const result = await sql({
    query: "SELECT * FROM lessons WHERE id_lesson <= 29",
  });

  return result;
};

export const getMediumLevel = async () => {
  const result = await sql({
    query: "SELECT * FROM lessons WHERE id_lesson BETWEEN 30 AND 75",
  });

  return result;
};

export const getAdvancedLevel = async () => {
  const result = await sql({
    query: "SELECT * FROM lessons WHERE id_lesson BETWEEN 76 AND 95",
  });

  return result;
};

export const detail = async (id: string) => {
  const result = await sql({
    query: "SELECT * FROM lessons WHERE id_lesson = ?",
    values: [id],
  });
  return result;
};

export const getLesson = async (slug: string) => {
  const result = await sql({
    query: "SELECT * FROM lessons WHERE slug = ?",
    values: [slug],
  });
  return result;
};

// export const create = async (
//   data: Pick<LessonsModel, "id" | "name" | "email" | "password" | "role">
// ) => {
//   const result = await sql({
//     query:
//       "INSERT INTO users (id_user, name, email, password, image, last_lesson, xp, role) VALUES (?, ?, ?, ?, 'user.png', 0, 0, ?)",
//     values: [data.id, data.name, data.email, data.password, data.role],
//   });
//   return result;
// };

// export const update = async (
//   id: string,
//   data: Pick<LessonsModel, "id" | "name" | "email" | "password">
// ) => {
//   await sql({
//     query: "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
//     values: [data.name, data.email, data.password, id],
//   });
// };

// export const remove = async (id: string) => {
//   try {
//     await sql({
//       query: "DELETE FROM users WHERE id=?",
//       values: [id],
//     });

//     return true;
//   } catch (error) {
//     return false;
//   }
// };
