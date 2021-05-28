const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("User", "postgres", "Shiva@123", {
  host: "localhost",
  dialect: "postgres",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
sequelize
  .authenticate()
  .then(() => console.log("database is connected."))
  .catch((err) => console.log(err));

module.exports = { sequelize };
