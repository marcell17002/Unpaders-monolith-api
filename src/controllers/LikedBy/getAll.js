const likedModel = require("../../models/liked");

module.exports = (req, res, next) => {
  likedModel
    .find()
    .then((result) => {
      res.status(200).json({
        status: "success",
        message: "Render data success",
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
