const { validationResult } = require("express-validator");
const LikedModel = require("../../models/liked");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid Value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }
  const userId = req.body.userId;
  const eventId = req.body.eventId;
  const status = req.body.status;

  const dataLiked = new LikedModel({
    userId: userId,
    eventId: eventId,
    status: status,
  });

  LikedModel.find({ $and: [{ eventId: eventId }, { userId: userId }] })
    .then((result) => {
      if (Object.keys(result).length === 0) {
        dataLiked
          .save()
          .then((result) => {
            res.status(201).json({
              status: "success",
              message: "Event have been liked ",
              data: result,
            });
          })
          .catch((err) => {
            return res.status(400).json({
              status: "error",
              message: err.message,
            });
          });
      } else {
        return res.status(400).json({
          status: "error",
          message: "event has been liked",
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
