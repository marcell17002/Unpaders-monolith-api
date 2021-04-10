const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/Notifications");

router.post("/", notificationController.pushNotification);

module.exports = router;
