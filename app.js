const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const bodyParser = require("body-parser");

const classRoutes = require("./routes/class");
const teacherRoutes = require("./routes/teacher");

require("./db/sequelize");

app.use(bodyParser.json());

app.use(classRoutes);
app.use(teacherRoutes);

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("port is running on port " + PORT);
});

app.get("/", (req, res) => {
  res.send("<h1>Hello Express </h1>");
});
