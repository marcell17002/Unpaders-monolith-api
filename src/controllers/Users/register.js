const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/users");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid Value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const nim = req.body.nim;
  const hashedPassword = bcrypt.hashSync(password, 6);

  const dataRegister = new User({
    name: name,
    email: email,
    password: hashedPassword,
    nim: nim,
  });

  dataRegister
    .save()
    .then((result) => {
      res.status(201).json({ message: "Create User Success", data: result });
    })
    .catch((err) => {
      next(err);
    });
};
