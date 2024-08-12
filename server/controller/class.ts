import { H3Event } from "h3";
import * as classModel from "~/server/model/class";

export const read = async () => {
  return await classModel.read();
};

export const getClass = async (evt: H3Event) => {
  const body = await readBody(evt);
  const result = await classModel.getClass(body.teacher);
  return result;
};

export const detail = async (evt: H3Event) => {
  const result = await classModel.detail(evt.context.params?.code as string);
  return result;
};

export const create = async (evt: H3Event) => {
  const body = await readBody(evt);
  const result = await classModel.create({
    id: body.id,
    name: body.name,
    school_name: body.school_name,
    teacher: body.teacher,
    class_code: body.class_code,
  });
  return result;
};

export const update = async (evt: H3Event) => {
  const body = await readBody(evt);
  const result = await classModel.update(evt.context.params?.code as string, {
    id: body.id,
    name: body.name,
    school_name: body.school_name,
    teacher: body.teacher,
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
