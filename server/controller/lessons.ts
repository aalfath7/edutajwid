import { H3Event } from "h3";
import * as LessonsModel from "~/server/model/lessons";

export const read = async () => {
  return await LessonsModel.read();
};

export const getBasicLevel = async () => {
  return await LessonsModel.getBasicLevel();
};
export const getMediumLevel = async () => {
  return await LessonsModel.getMediumLevel();
};
export const getAdvancedLevel = async () => {
  return await LessonsModel.getAdvancedLevel();
};

export const detail = async (evt: H3Event) => {
  const result = await LessonsModel.detail(evt.context.params?.id as string);
  return result;
};

export const getLesson = async (evt: H3Event) => {
  const result = await LessonsModel.getLesson(
    evt.context.params?.slug as string
  );
  return result;
};

// export const create = async (evt: H3Event) => {
//   const body = await readBody(evt);
//   const result = await LessonsModel.create({
//     id: body.id,
//     name: body.name,
//     email: body.email,
//     password: body.password,
//     role: body.role,
//   });
//   return result;
// };

// export const update = async (evt: H3Event) => {
//   const body = await readBody(evt);
//   await LessonsModel.update(evt.context.params?.id as string, {
//     id: body.id,
//     name: body.name,
//     email: body.email,
//     password: body.password,
//   });
// };

// export const remove = async (evt: H3Event) => {
//   const result = await LessonsModel.remove(evt.context.params?.id as string);
//   return result;
// };
