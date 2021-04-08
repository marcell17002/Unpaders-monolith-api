const alumniModel = require("../../models/mockAlumni");

module.exports = async (req, res, next) => {
  const npm = req.params.npm;
  alumniModel
    .find({ npm: npm })
    .then((result) => {
      if (Object.keys(result).length === 0) {
        return res.status(400).json({
          status: "error",
          message: "alumni not found",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "alumni founded",
          data: result,
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    });
};
