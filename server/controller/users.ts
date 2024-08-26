import { H3Event } from "h3";
import * as usersModel from "~/server/model/users";

export const read = async () => {
  return await usersModel.read();
};

export const getLeaderboard = async () => {
  return await usersModel.getLeaderboard();
};

export const detail = async (evt: H3Event) => {
  const result = await usersModel.detail(evt.context.params?.id as string);
  return result;
};

export const getDataWithEmail = async (evt: H3Event) => {
  const result = await usersModel.getDataWithEmail(
    evt.context.params?.email as string
  );
  return result;
};

export const login = async (evt: H3Event) => {
  const body = await readBody(evt);
  const result = await usersModel.login({
    email: body.email,
    password: body.password,
  });
  return result;
};

export const create = async (evt: H3Event) => {
  const body = await readBody(evt);
  const result = await usersModel.create({
    id: body.id,
    name: body.name,
    email: body.email,
    password: body.password,
    role: body.role,
  });
  return result;
};

export const update = async (evt: H3Event) => {
  const body = await readBody(evt);
  await usersModel.update(evt.context.params?.id as string, {
    id: body.id,
    name: body.name,
    email: body.email,
    password: body.password,
  });
};

export const updateLessonPassed = async (evt: H3Event) => {
  const body = await readBody(evt);
  await usersModel.updateLessonPassed(evt.context.params?.id as string, {
    lesson_passed: body.lesson_passed,
  });
};

export const updateLesson = async (evt: H3Event) => {
  const body = await readBody(evt);
  await usersModel.updateLesson(evt.context.params?.id as string, {
    last_lesson: body.last_lesson,
    xp: body.xp,
  });
};

export const remove = async (evt: H3Event) => {
  const result = await usersModel.remove(evt.context.params?.id as string);
  return result;
};
