import { useBase, createRouter, defineEventHandler } from "h3";

import * as usersController from "~/server/controller/users";
import * as classController from "~/server/controller/class";
import * as joinClassController from "~/server/controller/joinClass";
import * as lessonsController from "~/server/controller/lessons";

const router = createRouter();

// users
router.get("/users", defineEventHandler(usersController.read));
router.get(
  "/users/leaderboard",
  defineEventHandler(usersController.getLeaderboard)
);
router.get(
  "/users/request-change-role",
  defineEventHandler(usersController.getRequestChangeRole)
);
router.get("/users/:id", defineEventHandler(usersController.detail));
router.get(
  "/users/email/:email",
  defineEventHandler(usersController.getDataWithEmail)
);
router.get(
  "/users/token/:token",
  defineEventHandler(usersController.getDataWithToken)
);

router.post("/users", defineEventHandler(usersController.create));
router.post("/login", defineEventHandler(usersController.login));
router.post("/upload/:id", defineEventHandler(usersController.uploadImage));
router.post(
  "/upload-file/:id",
  defineEventHandler(usersController.uploadFileRequest)
);
router.put("/users/:id", defineEventHandler(usersController.update));
router.put(
  "/users/change-role/:id",
  defineEventHandler(usersController.changeRole)
);
router.put(
  "/users/rejected/:id",
  defineEventHandler(usersController.rejectedChangeRole)
);
router.put(
  "/users/update-lesson/:id",
  defineEventHandler(usersController.updateLesson)
);
router.put(
  "/users/update-lesson-passed/:id",
  defineEventHandler(usersController.updateLessonPassed)
);
router.put(
  "/users/email-verify/:token",
  defineEventHandler(usersController.emailVerify)
);
router.delete("/users/:id", defineEventHandler(usersController.remove));

// class
router.get("/class", defineEventHandler(classController.read));
router.get("/class/:code", defineEventHandler(classController.detail));
router.post("/class/teacher", defineEventHandler(classController.getClass));
router.post("/class", defineEventHandler(classController.create));
router.put("/class/:code", defineEventHandler(classController.update));
router.put(
  "/class/update-students/:code",
  defineEventHandler(classController.updateStudents)
);
router.delete("/class/:code", defineEventHandler(classController.remove));

// join class
router.get("/joinclass", defineEventHandler(joinClassController.read));
router.get("/joinclass/:id", defineEventHandler(joinClassController.detail));
router.get(
  "/joinclass/student-class/:id",
  defineEventHandler(joinClassController.getStudentClass)
);
router.get(
  "/joinclass/get-teachers-request/:id",
  defineEventHandler(joinClassController.getTeachersRequest)
);
router.get(
  "/joinclass/get-teachers-request-user/:id",
  defineEventHandler(joinClassController.getTeachersRequestByIdUser)
);
router.get(
  "/joinclass/get-students-request/:id",
  defineEventHandler(joinClassController.getStudentsRequest)
);
router.get(
  "/joinclass/get-students-request-user/:id",
  defineEventHandler(joinClassController.getStudentsRequestByIdUser)
);
router.get(
  "/joinclass/students-progress/:id",
  defineEventHandler(joinClassController.studentProgress)
);
router.post("/joinclass", defineEventHandler(joinClassController.create));
router.put("/joinclass/:id", defineEventHandler(joinClassController.update));
router.delete("/joinclass/:id", defineEventHandler(joinClassController.remove));

// lessons
router.get("/lessons", defineEventHandler(lessonsController.read));
router.get(
  "/lessons/basic-level",
  defineEventHandler(lessonsController.getBasicLevel)
);
router.get(
  "/lessons/medium-level",
  defineEventHandler(lessonsController.getMediumLevel)
);
router.get(
  "/lessons/advanced-level",
  defineEventHandler(lessonsController.getAdvancedLevel)
);
router.get("/lessons/:slug", defineEventHandler(lessonsController.getLesson));
router.get(
  "/lessons/get-data/:id",
  defineEventHandler(lessonsController.detail)
);
// router.post("/lessons", defineEventHandler(lessonsController.create));
// router.put("/lessons/:slug", defineEventHandler(lessonsController.update));
// router.delete("/lessons/:slug", defineEventHandler(lessonsController.remove));

export default useBase("/api", router.handler);
