const historyModel = require("../../models/historyChat");

module.exports = async (req, res, next) => {
  const variable = req.params.variable;
  const valueData = req.params.valueData;

  historyModel
    .find({ [variable]: [valueData] })
    .then((result) => {
      if (Object.keys(result).length === 0) {
        return res.status(400).json({
          status: "error",
          message: "event category not found",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "event category founded",
          data: result,
        });
      }
    })
    .catch((err) => {
      return res.status(404).json({
        status: "error",
        message: err.message,
      });
    });
};
