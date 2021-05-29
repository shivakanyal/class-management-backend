exports.isStudent = (req, res, next) => {
  console.log("req.user : ", req.user);
  if (req.user.role === "student") {
    return next();
  }
  return res.send({ message: "Unauthorized.." }).status(401);
};
