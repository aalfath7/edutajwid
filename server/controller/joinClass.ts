import { H3Event } from "h3";
import * as joinClassModel from "~/server/model/joinClass";

export const read = async () => {
  return await joinClassModel.read();
};

export const detail = async (evt: H3Event) => {
  const result = await joinClassModel.detail(evt.context.params?.id as string);
  return result;
};

export const create = async (evt: H3Event) => {
  const body = await readBody(evt);
  const result = await joinClassModel.create({
    id: body.id,
    id_class: body.id_class,
    id_user: body.id_user,
  });
  return result;
};

export const update = async (evt: H3Event) => {
  const body = await readBody(evt);
  const result = await joinClassModel.update(
    evt.context.params?.code as string,
    {
      id: body.id,
      id_class: body.id_class,
      id_user: body.id_user,
    }
  );
  return result;
};

export const remove = async (evt: H3Event) => {
  const result = await joinClassModel.remove(evt.context.params?.id as string);
  return result;
};
