import { H3Event } from "h3";
import * as usersModel from "~/server/model/users";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { createWriteStream } from "fs";
import { join } from "path";
import { nanoid } from "nanoid";

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

export const getDataWithToken = async (evt: H3Event) => {
  const result = await usersModel.getDataWithToken(
    evt.context.params?.token as string
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
  const token = crypto.randomBytes(32).toString("hex");
  const body = await readBody(evt);

  const result = await usersModel.create({
    id: body.id,
    name: body.name,
    email: body.email,
    password: body.password,
    token: token,
  });
  // if (result.error === null) {
  //   const transporter = nodemailer.createTransport({
  //     host: "proud.jagoanhosting.com",
  //     auth: {
  //       user: "edutajwid@qti.biz.id",
  //       pass: "3*v6(uayB$}z",
  //     },
  //   });

  //   await transporter.sendMail({
  //     from: '"Edutajwid" <edutajwid@qti.biz.id>',
  //     to: body.email,
  //     subject: "Verify Your Email",
  //     html: `<p>Please verify your email by clicking the following link:</p>
  //            <a href="http://localhost:3000/users/verification-mail-${token}">Verify Email</a>`,
  //   });
  // }
  return result;
};

export const update = async (evt: H3Event) => {
  const body = await readBody(evt);
  const results = await usersModel.update(evt.context.params?.id as string, {
    id: body.id,
    name: body.name,
    email: body.email,
    password: body.password,
  });
  return results;
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

export const emailVerify = async (evt: H3Event) => {
  const body = await readBody(evt);
  const result = await usersModel.emailVerify(
    evt.context.params?.token as string,
    {
      email_verify: body.email_verify,
    }
  );
  return result;
};

export const remove = async (evt: H3Event) => {
  const result = await usersModel.remove(evt.context.params?.id as string);
  return result;
};

export const uploadImage = async (evt: H3Event) => {
  const formData = await readMultipartFormData(evt);
  if (!formData) {
    return {
      statusCode: 400,
      message: "Please upload a file!",
    };
  }

  formData.forEach(async (part) => {
    if (part.filename) {
      let filename = `${nanoid()}-${part.filename}`;
      const filePath = join("public/src/users/", filename);
      const fileStream = createWriteStream(filePath);
      fileStream.write(part.data);
      fileStream.end();

      await usersModel.updateImage(evt.context.params?.id as string, {
        image: filename,
      });
    }
  });

  return true;
};
