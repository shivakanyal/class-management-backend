const jwt = require("jsonwebtoken");

const createToken = (id, name, email, role) => {
  let token = jwt.sign({ id, name, email, role }, "secretKey", {
    expiresIn: "1h",
  });
  return token;
};

module.exports = { createToken };
