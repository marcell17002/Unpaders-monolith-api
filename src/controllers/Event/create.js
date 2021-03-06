const { validationResult } = require("express-validator");
const EventModel = require("../../models/event");
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
  const title = req.body.title;
  const category = req.body.category;
  const subCategory = req.body.subCategory;
  const desc = req.body.desc;
  const author = req.body.author;
  const status = req.body.status;
  var image = req.body.image;

  if (!isBase64(image, { mimeRequired: true })) {
    return res.status(400).json({ status: "error", message: "invalid base64" });
  }
  base64Img.img(image, "./images/event", Date.now(), async (err, filepath) => {
    if (err) {
      return res.status(400).json({ status: "error", meessage: err.message });
    }
    const filename = filepath.split("\\").pop().split("/").pop();
    console.log("isi filename", filename);

    const image = `/images/event/${filename}`;

    const Posting = new EventModel({
      title: title,
      category: category,
      subCategory: subCategory,
      image: image,
      desc: desc,
      author: author,
      status: status,
    });

    Posting.save()
      .then((result) => {
        result.image = `${req.get("host")}/images/event/${filename}`;
        res.status(201).json({
          message: "Create Event Success",
          data: result,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          status: "error",
          message: err.message,
        });
      });
  });
};
