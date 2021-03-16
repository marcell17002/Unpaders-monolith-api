const chatModel = require("../../models/chat");

module.exports = (req, res, next) => {
  const chatId = req.params.chatId;

  chatModel
    .findById(chatId)
    .then((post) => {
      if (!post) {
        const error = new Error("Data not found!");
        error.errorStatus = 404;
        throw error;
      }
      return chatModel.findByIdAndRemove(chatId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Data has been deleted!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
