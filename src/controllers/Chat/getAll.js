const chatModel = require("../../models/chat");

module.exports = (req, res, next) => {
  chatModel
    .find()
    .then((result) => {
      res.status(200).json({
        message: "Render data success",
        data: result,
      });
    })
    .catch((err) => next(err));
};
