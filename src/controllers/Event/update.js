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
  const desc = req.body.desc;
  const author = req.body.author;
  var image = req.body.image;

  if (!isBase64(image, { mimeRequired: true })) {
    return res.status(400).json({ status: "error", message: "invalid base64" });
  }
  base64Img.img(image, "./images", Date.now(), async (err, filepath) => {
    if (err) {
      return res.status(400).json({ status: "error", meessage: err.message });
    }
    const filename = filepath.split("\\").pop().split("/").pop();
    console.log("isi filename", filename);

    var image = `images/${filename}`;

    EventModel.findById(postId)
      .then(async (post) => {
        if (!post) {
          const err = new Error("Data not found");
          error.errorStatus = 404;
          throw err;
        }
        console.log("ISI MEDIA POST :", post.image);
        await removeImage(post.image, res);

        post.title = title;
        post.category = category;
        post.desc = desc;
        post.author = author;
        post.image = image;

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
  });
};

const removeImage = (filePath, res) => {
  console.log("filepath : ", filePath);
  fs.unlink(`./${filePath}`, async (err) => {
    if (err) {
      return res.status(400).json({ status: "error", message: err.message });
    }
  });
};