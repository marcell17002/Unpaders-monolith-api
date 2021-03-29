const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/users");
const isBase64 = require("is-base64");
const base64Img = require("base64-img");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid Value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }
  const name = req.body.name;
  const nim = req.body.nim;
  const job = req.body.job;
  const faculty = req.body.faculty;
  const prodi = req.body.prodi;
  const graduated = req.body.graduated;
  const phone = req.body.phone;
  var image = req.body.image;
  const email = req.body.email;
  const password = req.body.password;
  const status = req.body.status;
  const hashedPassword = bcrypt.hashSync(password, 6);
  const imgUsername = name.split(" ", 1).toString();

  if (!isBase64(image, { mimeRequired: true })) {
    return res.status(400).json({ status: "error", message: "invalid base64" });
  }

  User.find({ email: email })
    .then((result) => {
      if (Object.keys(result).length === 0) {
        console.log("true");
        base64Img.img(
          image,
          "./images/profiles",
          `${imgUsername}_${Date.now()}`,
          async (err, filepath) => {
            if (err) {
              return res
                .status(400)
                .json({ status: "error", meessage: err.message });
            }
            const filename = filepath.split("\\").pop().split("/").pop();
            console.log("isi filename", filename);
            const imagePath = `images/profiles/${filename}`;
            const dataRegister = new User({
              name: name,
              nim: nim,
              job: job,
              faculty: faculty,
              prodi: prodi,
              graduated: graduated,
              phone: phone,
              image: imagePath,
              email: email,
              password: hashedPassword,
              status: status,
            });
            dataRegister
              .save()
              .then((result) => {
                result.image = `${req.get("host")}/images/profiles/${filename}`;
                return res.status(201).json({
                  message: "Create User Success",
                  data: result,
                });
              })
              .catch((err) => {
                return res.status(400).json({
                  status: "error",
                  message: err.message,
                });
              });
          }
        );
      } else {
        return res.status(404).json({
          status: "error",
          message: "email has been used",
        });
      }
    })
    .catch((err) => {
      return res.status(404).json({
        status: "error",
        message: err.message,
      });
    });
};
