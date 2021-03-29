const User = require("../../models/users");
const fs = require("fs");

module.exports = (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          status: "error",
          message: "user not found",
        });
      }
      removeImage(post.image);
      return User.findByIdAndRemove(userId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Data has been deleted!",
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

const removeImage = (filePath, res) => {
  console.log("filepath : ", filePath);
  fs.unlink(`./${filePath}`, async (err) => {
    if (err) {
      return res.status(400).json({ status: "error", message: err.message });
    }
  });
};
