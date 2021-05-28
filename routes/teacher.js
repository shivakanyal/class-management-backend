const express = require("express");

const router = express.Router();
const teacherController = require("../controllers/teacher");

router.post("/api/teacher/login", teacherController.login);

router.get("/api/teacher/:id", teacherController.getTeacher);

router.post("/api/teacher", teacherController.addTeacher);

module.exports = router;
