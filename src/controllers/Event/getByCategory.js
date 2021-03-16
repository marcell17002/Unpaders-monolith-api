const EventModel = require("../../models/event");

module.exports = (req, res, next) => {
  const category = req.params.category;

  EventModel.find({ category: category })
    .then((result) => {
      if (Object.keys(result).length === 0) {
        return res.status(400).json({
          status: "error",
          message: "event category not found",
          data: {},
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "Event category  founded",
          data: result,
        });
      }
    })
    .catch((err) => next(err));
};
