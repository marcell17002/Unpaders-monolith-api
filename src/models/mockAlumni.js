const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mockAlumni = new Schema(
  {
    npm: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("mockAlumni", mockAlumni);
