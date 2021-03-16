const EventModel = require("../../models/event");
const fs = require("fs");

module.exports = (req, res, next) => {
  const postId = req.params.postId;

  EventModel.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          status: "error",
          message: "event not found",
        });
      }
      removeImage(post.image, res);
      return EventModel.findByIdAndRemove(postId);
    })
    .then((result) => {
      return res.status(200).json({
        message: "Data has been deleted!",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "error",
        message: err,
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
