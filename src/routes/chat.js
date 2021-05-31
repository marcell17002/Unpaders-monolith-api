const express = require("express");
const router = express.Router();

const chatController = require("../controllers/Chat/");
// const verifyToken = require("../controllers/verifyToken");

router.post("/", chatController.create);
router.get("/", chatController.getAll);
router.get("/:variable/:valueData", chatController.getById);
router.delete("/:chatId", chatController.destroy);

module.exports = router;
