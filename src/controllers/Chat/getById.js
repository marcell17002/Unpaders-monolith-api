const chatModel = require("../../models/chat");

module.exports = async (req, res, next) => {
  const variable = req.params.variable;
  const valueData = req.params.valueData;

  chatModel
    .find({ [variable]: [valueData] })
    .then((result) => {
      if (Object.keys(result).length === 0) {
        return res.status(400).json({
          status: "error",
          message: "chat history not found",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "chat history founded",
          data: result,
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    });
};
