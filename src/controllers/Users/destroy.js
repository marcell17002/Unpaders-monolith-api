const User = require("../../models/users");

module.exports = (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((post) => {
      if (!post) {
        const error = new Error("Data not found!");
        error.errorStatus = 404;
        throw error;
      }
      // removeImage(post.image);
      return User.findByIdAndRemove(userId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Data has been deleted!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
