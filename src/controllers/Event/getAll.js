const EventModel = require("../../models/event");

module.exports = (req, res, next) => {
  EventModel.find()
    .then((result) => {
      res.status(200).json({
        status: "success",
        message: "Render data success",
        data: result,
      });
    })
    .catch((err) => next(err));
};
