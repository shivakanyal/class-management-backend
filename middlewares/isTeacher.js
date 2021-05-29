exports.isTeacher = (req, res, next) => {
  if (req.user.role === "teacher") {
    return next();
  }
  return res.send({ message: "Unauthorized.." }).status(401);
};
