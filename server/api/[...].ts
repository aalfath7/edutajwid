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
router.get("/users/person/:id", defineEventHandler(usersController.detail));
router.get(
  "/users/email/:email",
  defineEventHandler(usersController.getDataWithEmail)
);
router.post("/users", defineEventHandler(usersController.create));
router.post("/login", defineEventHandler(usersController.login));
router.put("/users/:id", defineEventHandler(usersController.update));
router.put(
  "/users/update-lesson/:id",
  defineEventHandler(usersController.updateLesson)
);
router.put(
  "/users/update-lesson-passed/:id",
  defineEventHandler(usersController.updateLessonPassed)
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
