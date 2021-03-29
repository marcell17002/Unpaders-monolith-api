const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const validator = require("../middlewares/validator");
const usersController = require("../controllers/Users/");

//creating user
router.post(
  "/register",
  [validator("password", 6), validator("image", null, true)],
  usersController.register
);
router.get("/", usersController.getAll);
router.get("/:userId", usersController.getById);
router.put(
  "/:userId",
  [
    body("password")
      .isLength({ min: 6 })
      .withMessage("Input password min. 6 character"),
  ],
  usersController.update
);
router.delete("/:userId", usersController.destroy);

// authentication
router.post("/login", usersController.login);
router.get("/logout/:userId", usersController.logout);
module.exports = router;
