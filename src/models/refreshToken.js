const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const refreshToken = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("refreshToken", refreshToken);
