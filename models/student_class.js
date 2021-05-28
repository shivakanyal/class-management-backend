const { sequelize } = require("../db/sequelize");

const Student = require("./student");
const Class = require("./class");

const StudentClass = sequelize.define(
  "StudentClass",
  {},
  { timestamps: false }
);
Student.belongsToMany(Class, { through: StudentClass });
Class.belongsToMany(Student, { through: StudentClass });

// StudentClass.sync()
//   .then((res) =>
//     console.log("The table for the StudentClass model is created!")
//   )
//   .catch((err) => console.log(err));
