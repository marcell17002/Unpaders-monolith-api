const monggose = require("mongoose");
const Schema = monggose.Schema;

const HistoryChat = new Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    idSender: {
      type: String,
      required: true,
    },
    lastChat: {
      type: String,
    },
    lastDate: {
      type: String,
      required: true,
    },
    idReceiver: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = monggose.model("HistoryChat", HistoryChat);
