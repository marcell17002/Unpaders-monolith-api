const likedModel = require("../../models/liked");

module.exports = (req, res, next) => {
  const variable = req.params.variable;
  const valueData = req.params.valueData;

  likedModel
    .find({ [variable]: [valueData] })
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
