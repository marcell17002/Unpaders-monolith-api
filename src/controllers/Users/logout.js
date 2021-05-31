const User = require("../../models/users");
const RefreshToken = require("../../models/refreshToken");

module.exports = (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((result) => {
      if (result) {
        return RefreshToken.deleteMany({ userId: userId })
          .then((result) => {
            res.status(200).json({
              status: "success",
              message: "Logout successful",
            });
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      return res.status(404).json({
        status: "error",
        message: "user not found ss",
      });
    });
};
