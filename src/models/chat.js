const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatModel = new Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    allChat: {
      dateChat: String,
      chatText: {
        sendBy: String,
        // userImage: String,
        chatTime: String,
        chatContent: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chat", chatModel);
