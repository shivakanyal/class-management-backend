const express = require("express");

const router = express.Router();

const studentController = require("../controllers/student");

router.post("/api/student", studentController.addStudent);

router.get("/api/student/:id", studentController.getStudent);

router.post("/api/student/login", studentController.login);

module.exports = router;
