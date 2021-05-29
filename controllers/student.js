const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/createToken");
const Student = require("../models/student");
const Class = require("../models/class");

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
    const token = createToken(student.studentId, name, email, role);
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
    if (!isEqual) {
      return res.send({ message: "email or password is incorrect" }).code(401);
    }
    const token = createToken(
      student.studentId,
      student.name,
      email,
      student.role
    );
    return res.send({ message: "student is logged in", token }).status(200);
  } catch (error) {
    console.log(error);
    return res.send({ message: error.message }).status(500);
  }
};

async function addClassToStudent(studentId, classId, res) {
  try {
    const student = await Student.findOne({ where: { studentId } });
    if (!student) {
      return res.send({ message: "no student is found" }).status(404);
    }
    const nclass = await Class.findOne({ where: { classId } });
    if (!nclass) {
      return res.send({ message: "no student is found" }).status(404);
    }
    const result = await student.addClass(nclass);
    console.log("result : ", result);
    return res
      .send({ message: "student is registered successfully" })
      .status(201);
  } catch (error) {
    console.log(error);
    return res.send({ message: error.message }).status(500);
  }
}

exports.register = async (req, res) => {
  const classId = req.params.classId;
  const studentId = req.user.id;

  addClassToStudent(studentId, classId, res);
};

exports.getRegisteredClasses = async (req, res) => {
  try {
    const studentId = 1 || req.user.id;
    const result = await Student.findByPk(studentId, {
      include: [
        {
          model: Class,
          attributes: ["classId", "name", "teacherName"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    const classes = result.Classes;
    return res.send(classes).status(200);
  } catch (error) {
    return res.send({ message: error.message }).status(500);
  }
};
