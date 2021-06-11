const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const refreshTokenController = require("../controllers/refreshToken");
router.post("/", verifyToken, refreshTokenController.create);

module.exports = router;
