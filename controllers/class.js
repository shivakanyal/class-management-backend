const Class = require("../models/class");

exports.getClass = async (req, res) => {
  try {
    const id = req.params.id;
    const nclass = await Class.findOne({ where: { classId: id } });
    if (!nclass) {
      return res.send({ message: "no class is found" }).status(404);
    }
    res.send({ nclass });
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll();

    res.send({ classes });
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
};

exports.addClass = async (req, res) => {
  try {
    console.log(req.body);
    const nclass = await Class.create(req.body);
    console.log("class : ", nclass);
    return res.send({ message: "new class is added", nclass }).status(201);
  } catch (error) {
    return res.send({ message: error.message }).status(500);
  }
};

exports.editClass = async (req, res) => {
  try {
    const id = req.params.id;
    let nclass = await Class.findOne({ where: { classId: id } });
    if (!nclass) {
      return res.send({ message: "no class is found" }).status(404);
    }
    nclass = await Class.update(req.body, { where: { classId: id } });
    res.send({ message: "class is updated", nclass });
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const id = req.params.id;
    let nclass = await Class.findOne({ where: { classId: id } });
    if (!nclass) {
      return res.send({ message: "no class is found" }).status(404);
    }
    await nclass.destroy();
    res.send({ message: "class is deleted successfully", nclass });
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
};
