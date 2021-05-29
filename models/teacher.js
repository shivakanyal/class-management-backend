const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelize");
const Class = require("./class");

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
    className: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Teacher.belongsTo(Class, { foreignKey: "classId", allowNull: false });
// Teacher.sync({ force: true })
//   .then((res) => console.log("The table for the Teacher model is created!"))
//   .catch((err) => console.log(err));

module.exports = Teacher;
