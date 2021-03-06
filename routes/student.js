const express = require("express");

const auth = require("../middlewares/auth");

const router = express.Router();

const { isStudent } = require("../middlewares/isStudent");

const studentController = require("../controllers/student");

router.post("/api/student", studentController.addStudent);

router.get("/api/student/:id", auth, isStudent, studentController.getStudent);

router.post("/api/student/login", studentController.login);

router.post("/api/student/register/:classId", auth, studentController.register);

router.get(
  "/api/student/register/:studentId",
  studentController.getRegisteredClasses
);
// getRegisteredClasses
module.exports = router;
