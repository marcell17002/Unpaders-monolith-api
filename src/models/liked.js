const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likedModel = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    eventId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("likedModel", likedModel);
