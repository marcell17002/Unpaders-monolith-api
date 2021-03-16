const chatModel = require("../../models/chat");

module.exports = async (req, res, next) => {
  const chatId = req.params.chatId;
  chatModel
    .find({ chatID: chatId })
    .then((result) => {
      if (Object.keys(result).length === 0) {
        return res.status(400).json({
          status: "error",
          message: "chat history not found",
          data: {},
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "chat history founded",
          data: result,
        });
      }
    })
    .catch((err) => next(err));
};
