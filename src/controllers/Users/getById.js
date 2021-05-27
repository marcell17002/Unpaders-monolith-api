const User = require("../../models/users");

module.exports = (req, res, next) => {
  const variable = req.params.variable;
  const valueData = req.params.valueData;

  User.find({ [variable]: [valueData] })
    .then((result) => {
      if (Object.keys(result).length === 0) {
        return res.status(400).json({
          status: "error",
          message: "user not found",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "userfounded",
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
