import { H3Event } from "h3";
import * as joinClassModel from "~/server/model/joinClass";

export const read = async () => {
  return await joinClassModel.read();
};

export const detail = async (evt: H3Event) => {
  const result = await joinClassModel.detail(evt.context.params?.id as string);
  return result;
};

export const getStudentClass = async (evt: H3Event) => {
  const result = await joinClassModel.getStudentClass(
    evt.context.params?.id as string
  );
  return result;
};

export const getTeachersRequest = async (evt: H3Event) => {
  const result = await joinClassModel.getTeachersRequest(
    evt.context.params?.id as string
  );
  return result;
};

export const getTeachersRequestByIdUser = async (evt: H3Event) => {
  const result = await joinClassModel.getTeachersRequestByIdUser(
    evt.context.params?.id as string
  );
  return result;
};

export const getStudentsRequest = async (evt: H3Event) => {
  const result = await joinClassModel.getStudentsRequest(
    evt.context.params?.id as string
  );
  return result;
};

export const getStudentsRequestByIdUser = async (evt: H3Event) => {
  const result = await joinClassModel.getStudentsRequestByIdUser(
    evt.context.params?.id as string
  );
  return result;
};

export const studentProgress = async (evt: H3Event) => {
  const result = await joinClassModel.studentProgress(
    evt.context.params?.id as string
  );
  return result;
};

export const create = async (evt: H3Event) => {
  const body = await readBody(evt);
  const result = await joinClassModel.create({
    id: body.id,
    id_class: body.id_class,
    id_user: body.id_user,
    status: body.status,
  });
  return result;
};

export const update = async (evt: H3Event) => {
  const body = await readBody(evt);
  const result = await joinClassModel.update(evt.context.params?.id as string, {
    status: body.status,
  });
  return result;
};

export const remove = async (evt: H3Event) => {
  const result = await joinClassModel.remove(evt.context.params?.id as string);
  return result;
};
