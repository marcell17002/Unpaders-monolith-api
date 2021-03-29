const likedModel = require("../../models/liked");

module.exports = (req, res, next) => {
  const userId = req.params.userId;

  likedModel
    .find({ userId: userId })
    .then((result) => {
      if (Object.keys(result).length === 0) {
        return res.status(400).json({
          status: "error",
          message: "liked event's not found",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "liked event founded",
          data: result,
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
