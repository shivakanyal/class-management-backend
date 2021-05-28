const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/createToken");

const Teacher = require("../models/teacher");

exports.getTeacher = async (req, res) => {
  try {
    const id = req.params.id;
    const teacher = await Teacher.findOne({ where: { teacherId: id } });
    if (!teacher) {
      return res.send({ message: "no Teacher is found" }).status(404);
    }
    res.send({ teacher });
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
};

exports.addTeacher = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const password = req.body.password;
    let teacher = await Teacher.findOne({ where: { email: email } });
    if (teacher) {
      return res.send({ message: "teacher is already present" }).code(401);
    }
    const hashedpassword = await bcrypt.hash(password, 12);
    teacher = await Teacher.create({
      name,
      email,
      role,
      password: hashedpassword,
    });
    const token = createToken(name, email, role);
    return res.send({
      message: "teacher is created Successfully",
      teacher,
      token,
    });
  } catch (error) {
    return res.send({ message: error.message }).status(500);
  }
};

exports.login = async (req, res) => {
  try {
    console.log("i am running..");
    const email = req.body.email;
    const password = req.body.password;
    const teacher = await Teacher.findOne({ where: { email: email } });
    if (!teacher) {
      return res.send({ message: "teacher is not found" }).code(402);
    }
    const isEqual = await bcrypt.compare(password, teacher.password);
    console.log("isEqual ", isEqual);
    if (!isEqual) {
      return res.send({ message: "email or password is incorrect" }).code(401);
    }
    const token = createToken(teacher.name, email, teacher.role);
    return res.send({ message: "teacher is logged in", token }).code(200);
  } catch (error) {
    return res.send({ message: error.message }).status(500);
  }
};
