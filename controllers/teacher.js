const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/createToken");

const Teacher = require("../models/teacher");
const Class = require("../models/class");
const Student = require("../models/student");
const StudentClass = require("../models/studentClass");

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
    const className = req.body.className;
    const classId = req.body.classId;
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
      className,
      classId,
    });
    const token = createToken(teacher.teacherId, name, email, role);
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
    const token = createToken(
      teacher.teacherId,
      teacher.name,
      email,
      teacher.role
    );
    return res.send({ message: "teacher is logged in", token }).code(200);
  } catch (error) {
    return res.send({ message: error.message }).status(500);
  }
};

exports.getAllRegisteredStudent = async (req, res) => {
  try {
    const classId = 1 || req.user.id;
    const result = await Class.findByPk(classId, {
      include: [
        {
          model: Student,
          attributes: ["studentId", "name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return res.send(result).status(200);
  } catch (error) {
    return res.send({ message: error.message }).status(500);
  }
};

exports.deleteStudent = async (req, res) => {
  const studentId = req.params.studentId;
  const nclass = await Class.findOne({ where: { classId: 1 } });
  const student = await Student.findOne({ where: { studentId } });
  const result = await student.removeClass(nclass);
  return res.send({ message: "he he he", result }).status(200);
};
