const historyModel = require("../../models/historyChat");

module.exports = (req, res, next) => {
  historyModel
    .find()
    .then((result) => {
      res.status(200).json({
        message: "Render data success",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(404).json({
        status: "error",
        message: err.message,
      });
    });
};
