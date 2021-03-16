const chatModel = require("../../models/chat");

module.exports = (req, res, next) => {
  const chatId = req.params.chatId;

  chatModel
    .findById(chatId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          status: "error",
          message: "chat not found",
        });
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
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    });
};
