const chatModel = require("../../models/chat");

module.exports = async (req, res, next) => {
  const chatID = req.body.chatID;
  const allChat = req.body.allChat;
  const dateChat = req.body.dateChat;
  const chatText = req.body.chatText;
  const sendBy = req.body.sendBy;
  const userImage = req.body.userImage;
  const chatDate = req.body.chatDate;
  const chatContent = req.body.chatContent;

  const Data = new chatModel({
    chatID: chatID,
    allChat: allChat,
    dateChat: dateChat,
    chatText: chatText,
    sendBy: sendBy,
    chatDate: chatDate,
    userImage: userImage,
    chatContent: chatContent,
  });

  Data.save()
    .then((result) => {
      res.status(201).json({ message: "Send Message Success", data: result });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};
