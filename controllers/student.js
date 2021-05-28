const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/createToken");

const Student = require("../models/student");

exports.getStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findOne({ where: { studentId: id } });
    if (!student) {
      return res.send({ message: "no student is found" }).status(404);
    }
    res.send({ student });
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
};

exports.addStudent = async (req, res) => {
  try {
    // console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const password = req.body.password;
    let student = await Student.findOne({ where: { email: email } });
    if (student) {
      return res.send({ message: "student is already present" }).code(401);
    }
    const hashedpassword = await bcrypt.hash(password, 12);
    student = await Student.create({
      name,
      email,
      role,
      password: hashedpassword,
    });
    console.log("student ", student);
    const token = createToken(name, email, role);
    return res.send({
      message: "student is created Successfully",
      student,
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
    const student = await Student.findOne({ where: { email: email } });
    if (!student) {
      return res.send({ message: "student is not found" }).code(402);
    }
    const isEqual = await bcrypt.compare(password, student.password);
    console.log("isEqual ", isEqual);
    if (!isEqual) {
      return res.send({ message: "email or password is incorrect" }).code(401);
    }
    const token = createToken(student.name, email, student.role);
    return res.send({ message: "student is logged in", token }).code(200);
  } catch (error) {
    return res.send({ message: error.message }).status(500);
  }
};
