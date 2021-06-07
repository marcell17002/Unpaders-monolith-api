const historyModel = require("../../models/historyChat");

module.exports = async (req, res, next) => {
  const chatId = req.body.chatId;
  const lastChat = req.body.lastChat;
  const lastDate = req.body.lastDate;
  const idSender = req.body.idSender;
  const idReceiver = req.body.idReceiver;
  const status = req.body.status;

  const Data = new historyModel({
    chatId: chatId,
    lastChat: lastChat,
    lastDate: lastDate,
    idSender: idSender,
    idReceiver: idReceiver,
    status: status,
  });

  Data.save()
    .then((result) => {
      res
        .status(201)
        .json({ message: "Save History Message Success", data: result });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    });
};
