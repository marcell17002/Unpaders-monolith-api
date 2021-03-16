const User = require("../../models/users");

module.exports = (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((result) => {
      if (!result) {
        const error = new Error("User doesnt found!");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "User has been founded",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    });
};
