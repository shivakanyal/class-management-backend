const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
require("./db/sequelize");

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("port is running on port " + PORT);
});

app.get("/", (req, res) => {
  res.send("<h1>Hello Express </h1>");
});
