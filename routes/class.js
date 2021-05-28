const express = require("express");

const router = express.Router();
const classController = require("../controllers/class");

router.get("/api/class/:id", classController.getClass);

router.get("/api/classes", classController.getAllClasses);

router.post("/api/class", classController.addClass);

router.put("/api/class/:id", classController.editClass);

router.delete("/api/class/:id", classController.deleteClass);

module.exports = router;
