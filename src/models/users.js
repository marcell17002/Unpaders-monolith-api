const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nim: {
      type: String,
    },
    job: {
      type: String,
    },
    faculty: {
      type: String,
    },
    prodi: {
      type: String,
    },
    graduated: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", users);
