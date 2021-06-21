const alumniModel = require("../../models/mockAlumni");

module.exports = async (req, res, next) => {
  const npm = req.body.npm;
  const name = req.body.name;
  const faculty = req.body.faculty;
  const department = req.body.department;
  const graduated = req.body.graduated;

  const Data = new alumniModel({
    npm: npm,
    name: name,
    faculty: faculty,
    department: department,
    graduated: graduated,
  });

  Data.save()
    .then((result) => {
      res.status(201).json({ message: "User Has Been Added", data: result });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    });
};
