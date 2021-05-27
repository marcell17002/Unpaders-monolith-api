const likedModel = require("../../models/liked");

module.exports = (req, res, next) => {
  const likedId = req.params.likedId;

  likedModel
    .findById(likedId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          status: "error",
          message: "event not found",
        });
      }
      return likedModel.findByIdAndRemove(likedId);
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
