const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelize");

const Student = sequelize.define(
  "Student",
  {
    studentId: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "student",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Student.sync()
  .then((res) => console.log("The table for the Student model is created!"))
  .catch((err) => console.log(err));

module.exports = Student;
