const express = require("express");
const router = express.Router();

const chatController = require("../controllers/Chat/");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", chatController.create);
router.get("/", chatController.getAll);
router.get("/:variable/:valueData", chatController.getById);
router.delete("/:chatId", verifyToken, chatController.destroy);

module.exports = router;
