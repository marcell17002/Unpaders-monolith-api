const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const eventController = require("../controllers/Event/");
const verifyToken = require("../controllers/verifyToken");

router.post(
  "/",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("Input tittle min. 5 character"),
    body("desc")
      .isLength({ min: 50 })
      .withMessage("Input desc min. 50 character"),
  ],
  eventController.create
);
router.get("/", eventController.getAll);
router.get("/:category", eventController.getByCategory);
// router.get("/post/:postId", eventController.getEventPostById);
router.put(
  "/:postId",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("Input tittle min. 5 character"),
    body("desc")
      .isLength({ min: 50 })
      .withMessage("Input desc min. 50 character"),
  ],
  eventController.update
);
router.delete("/:postId", eventController.destroy);

module.exports = router;
