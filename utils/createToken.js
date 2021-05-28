const jwt = require("jsonwebtoken");

const createToken = (name, email, role) => {
  let token = jwt.sign({ name, email, role }, "secretKey", {
    expiresIn: "1h",
  });
  return token;
};

module.exports = { createToken };
