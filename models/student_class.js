const { sequelize } = require("../db/sequelize");

const Student_Class = sequelize.define(
  "Student_Class",
  {},
  { timestamps: false }
);
Student.belongsToMany(Class, { through: Student_Class });
Class.belongsToMany(Student, { through: Student_Class });

Student_Class.sync()
  .then((res) => console.log("The table for the Student model is created!"))
  .catch((err) => console.log(err));
