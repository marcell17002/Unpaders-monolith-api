const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/Notifications");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", verifyToken, notificationController.pushNotification);

module.exports = router;
