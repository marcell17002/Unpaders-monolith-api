const historyModel = require("../../models/historyChat");
const { validationResult } = require("express-validator");

module.exports = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const chatId = req.body.chatId;
  const lastChat = req.body.lastChat;
  const lastDate = req.body.lastDate;
  const idSender = req.body.idSender;
  const idReceiver = req.body.idReceiver;
  const idChat = req.params.idChat;

  historyModel
    .findById(idChat)
    .then((post) => {
      if (!post) {
        const err = new Error("Data not found");
        error.errorStatus = 404;
        throw err;
      }
      post.chatId = chatId;
      post.lastChat = lastChat;
      post.lastDate = lastDate;
      post.idSender = idSender;
      post.idReceiver = idReceiver;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Data has been updated!",
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
