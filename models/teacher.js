const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelize");

const Teacher = sequelize.define(
  "Teacher",
  {
    teacherId: {
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
      defaultValue: "teacher",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// Teacher.sync()
//   .then((res) => console.log("The table for the Teacher model is created!"))
//   .catch((err) => console.log(err));

module.exports = Teacher;
