const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).send({ message: "Not Authenticated." });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secretKey");
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
  if (!decodedToken) {
    return res.status(401).send({ message: "Not autherized." });
  }
  req.user = decodedToken;
  next();
};
