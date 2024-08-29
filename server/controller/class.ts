import { H3Event } from "h3";
import * as classModel from "~/server/model/class";

export const read = async () => {
  return await classModel.read();
};

export const getClass = async (evt: H3Event) => {
  const body = await readBody(evt);
  const result = await classModel.getClass(body.id_user);
  return result;
};

export const detail = async (evt: H3Event) => {
  const result = await classModel.detail(evt.context.params?.code as string);
  return result;
};

export const create = async (evt: H3Event) => {
  const body = await readBody(evt);
  const result = await classModel.create({
    id_class: body.id_class,
    id_user: body.id_user,
    name: body.name,
    school_name: body.school_name,
    class_code: body.class_code,
  });
  return result;
};

export const update = async (evt: H3Event) => {
  const body = await readBody(evt);
  const result = await classModel.update(evt.context.params?.code as string, {
    id_class: body.id_class,
    id_user: body.id_user,
    name: body.name,
    school_name: body.school_name,
  });
  return result;
};

export const updateStudents = async (evt: H3Event) => {
  const body = await readBody(evt);
  console.log(body);
  const result = await classModel.updateStudents(
    evt.context.params?.code as string,
    {
      number_of_students: body.number_of_students,
    }
  );
  return result;
};

export const remove = async (evt: H3Event) => {
  const result = await classModel.remove(evt.context.params?.code as string);
  return result;
};
