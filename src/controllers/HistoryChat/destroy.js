const historyModel = require("../../models/historyChat");

module.exports = (req, res, next) => {
  const idChat = req.params.idChat;

  historyModel
    .findById(idChat)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          status: "error",
          message: "chat not found",
        });
      }
      return historyModel.findByIdAndRemove(idChat);
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
