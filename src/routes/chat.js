const express = require("express");
const router = express.Router();

const chatController = require("../controllers/Chat/");
const verifyToken = require("../controllers/verifyToken");

router.post("/", chatController.create);
router.get("/", chatController.getAll);
router.get("/:chatId", chatController.getByChatId);
router.delete("/:chatId", chatController.destroy);

module.exports = router;
