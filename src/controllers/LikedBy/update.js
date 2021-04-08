const likedModel = require("../../models/liked");
const { validationResult } = require("express-validator");

module.exports = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const userId = req.body.userId;
  const eventId = req.body.eventId;
  const status = req.body.status;

  const likedId = req.params.likedId;

  likedModel
    .findById(likedId)
    .then((post) => {
      if (!post) {
        const err = new Error("Data not found");
        error.errorStatus = 404;
        throw err;
      }
      post.userId = userId;
      post.eventId = eventId;
      post.status = status;

      return post.save();
    })
    .then((result) => {
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
};
