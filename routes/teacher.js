const express = require("express");

const router = express.Router();

const teacherController = require("../controllers/teacher");

router.post("/api/teacher", teacherController.addTeacher);

router.get(
  "/api/teacher/students/:classId",
  teacherController.getAllRegisteredStudent
);

router.get("/api/teacher/:id", teacherController.getTeacher);

router.post("/api/teacher/login", teacherController.login);

router.delete(
  "/api/teacher/student/:studentId",
  teacherController.deleteStudent
);

module.exports = router;
