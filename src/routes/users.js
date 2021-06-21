const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const validator = require("../middlewares/validator");
const usersController = require("../controllers/Users/");
const verifyToken = require("../middlewares/verifyToken");

//creating user
router.post(
  "/register",
  [validator("password", 6), validator("image", null, true)],
  usersController.register
);
router.get("/", usersController.getAll);
router.get("/:variable/:valueData", usersController.getById);
router.put("/:userId", verifyToken, usersController.update);
router.delete("/:userId", verifyToken, usersController.destroy);

// authentication
router.post("/login", usersController.login);
router.delete("/logout/:userId", usersController.logout);
router.put(
  "/changePassword/:userId",
  validator("newPassword", 6),
  verifyToken,
  usersController.changePassword
);
module.exports = router;
