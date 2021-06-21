const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/users");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }
  const newPassword = req.body.newPassword;
  const hashedPassword = bcrypt.hashSync(newPassword, 6);

  const userId = req.params.userId;
  User.findById(userId)
    .then(async (post) => {
      if (!post) {
        return res.status(404).json({
          status: "error",
          message: "user not found",
        });
      }

      post.password = hashedPassword;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "password has been updated!",
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
