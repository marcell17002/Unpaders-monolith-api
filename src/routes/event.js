const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const eventController = require("../controllers/Event/");
const validator = require("../middlewares/validator");

const verifyToken = require("../middlewares/verifyToken");
router.post(
  "/",
  [validator("title", 5), validator("desc", 50)],
  verifyToken,
  eventController.create
);
router.get("/", eventController.getAll);
router.get("/:variable/:valueData", eventController.getById);
router.put(
  "/:postId",
  [validator("title", 5), validator("desc", 50)],
  verifyToken,
  eventController.update
);
router.delete("/:postId", eventController.destroy);

module.exports = router;
