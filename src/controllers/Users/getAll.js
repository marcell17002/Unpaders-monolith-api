const User = require("../../models/users");

module.exports = (req, res, next) => {
  User.find()
    .then((result) => {
      res.status(200).json({
        message: "Render data user success",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(404).json({
        status: "error",
        message: err.message,
      });
    });
};
