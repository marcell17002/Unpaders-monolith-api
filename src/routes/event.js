const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const eventController = require("../controllers/Event/");
const validator = require("../middlewares/validator");

router.post(
  "/",
  [validator("title", 5), validator("desc", 50)],
  eventController.create
);
router.get("/", eventController.getAll);
router.get("/:variable/:valueData", eventController.getById);
router.get("/user/:userId/:name", eventController.getByUserId);
router.put(
  "/:postId",
  [validator("title", 5), validator("desc", 50)],
  eventController.update
);
router.delete("/:postId", eventController.destroy);

module.exports = router;
