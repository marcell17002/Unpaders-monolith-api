const EventModel = require("../../models/event");
const { validationResult } = require("express-validator");
const isBase64 = require("is-base64");
const base64Img = require("base64-img");
const fs = require("fs");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  const postId = req.params.postId;

  if (!errors.isEmpty()) {
    const err = new Error("Invalid value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const title = req.body.title;
  const category = req.body.category;
  const subCategory = req.body.subCategory;
  const desc = req.body.desc;
  const author = req.body.author;
  const status = req.body.status;
  var image = req.body.image;

  if (image === "") {
    EventModel.findById(postId)
      .then(async (post) => {
        if (!post) {
          return res.status(404).json({
            status: "error",
            message: "event not found",
          });
        }
        console.log("ISI MEDIA POST :", post.image);
        post.title = title;
        post.category = category;
        post.subCategory = subCategory;
        post.desc = desc;
        post.author = author;
        post.image = post.image;
        post.status = status;

        return post.save();
      })
      .then((result) => {
        // result.image = `${req.get("host")}/images/event/${filename}`;
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
      "./images/event",
      Date.now(),
      async (err, filepath) => {
        if (err) {
          return res
            .status(400)
            .json({ status: "error", meessage: err.message });
        }
        const filename = filepath.split("\\").pop().split("/").pop();
        console.log("isi filename", filename);

        var image = `/images/event/${filename}`;

        EventModel.findById(postId)
          .then(async (post) => {
            if (!post) {
              return res.status(404).json({
                status: "error",
                message: "event not found",
              });
            }
            console.log("ISI MEDIA POST :", post.image);
            await removeImage(post.image, res);

            post.title = title;
            post.category = category;
            post.subCategory = subCategory;
            post.desc = desc;
            post.author = author;
            post.image = image;
            post.status = status;

            return post.save();
          })
          .then((result) => {
            result.image = `${req.get("host")}/images/event/${filename}`;
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
        status: "error",
        message: err.message,
      });
    }
  });
};
