const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/users");
const isBase64 = require("is-base64");
const base64Img = require("base64-img");
const fs = require("fs");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const name = req.body.name;
  const nim = req.body.nim;
  const level = req.body.level;
  const faculty = req.body.faculty;
  const prodi = req.body.prodi;
  const graduated = req.body.graduated;
  const phone = req.body.phone;
  var image = req.body.image;
  const email = req.body.email;
  const status = req.body.status;

  const userId = req.params.userId;
  const imgUsername = name.split(" ", 1).toString();

  if (image === "") {
    console.log("image kosong");
    User.findById(userId)
      .then(async (post) => {
        if (!post) {
          return res.status(404).json({
            status: "error",
            message: "user not found",
          });
        }
        console.log("ISI user image :", post.image);

        post.name = name;
        post.nim = nim;
        post.level = level;
        post.faculty = faculty;
        post.prodi = prodi;
        post.graduated = graduated;
        post.phone = phone;
        post.image = post.image;
        post.email = email;
        post.status = status;

        return post.save();
      })
      .then((result) => {
        // result.image = `${req.get("host")}/images/profiles/${filename}`;
        res.status(200).json({
          message: "Data has been updated!",
          data: result,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          status: "error",
          message: err.message,
        });
      });
  } else if (!isBase64(image, { mimeRequired: true })) {
    return res.status(400).json({ status: "error", message: "invalid base64" });
  } else {
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

        const imageUpdated = `/images/profiles/${filename}`;
        console.log("isi image updated :", imageUpdated);

        User.findById(userId)
          .then(async (post) => {
            if (!post) {
              return res.status(404).json({
                status: "error",
                message: "user not found",
              });
            }
            console.log("ISI user image :", post.image);
            await removeImage(post.image, res);

            post.name = name;
            post.nim = nim;
            post.level = level;
            post.faculty = faculty;
            post.prodi = prodi;
            post.graduated = graduated;
            post.phone = phone;
            post.image = imageUpdated;
            post.email = email;
            post.status = status;

            return post.save();
          })
          .then((result) => {
            result.image = `${req.get("host")}/images/profiles/${filename}`;
            res.status(200).json({
              message: "Data has been updated!",
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
  }
};
const removeImage = (filePath, res) => {
  console.log("filepath : ", filePath);
  fs.unlink(`./${filePath}`, async (err) => {
    if (err) {
      return res.status(400).json({
        status: "errorss",
        message: err.message,
      });
    }
  });
};
