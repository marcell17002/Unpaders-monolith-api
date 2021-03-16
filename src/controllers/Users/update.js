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

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 6);
  const image = req.body.image;
  const nim = req.body.nim;

  const userId = req.params.userId;

  User.findById(userId)
    .then((post) => {
      if (!post) {
        const err = new Error("Data not found");
        error.errorStatus = 404;
        throw err;
      }
      post.name = name;
      post.email = email;
      post.password = hashedPassword;
      post.image = image;
      post.nim = nim;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Data has been updated!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
