const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelize");

const Class = sequelize.define(
  "Class",
  {
    classId: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING,
    },
    endTime: {
      type: DataTypes.STRING,
    },
    teacherName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// Class.sync({ force: true })
//   .then((res) => console.log("The table for the Class model is created!"))
//   .catch((err) => console.log(err));

module.exports = Class;
