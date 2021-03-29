const express = require("express");

const router = express.Router();
const likedController = require("../controllers/LikedBy");

//creating user
router.post("/", likedController.create);
router.get("/", likedController.getAll);
router.get("/:userId", likedController.getByUserId);
router.get("/event/:eventId", likedController.getByEventId);
router.delete("/:likedId", likedController.destroy);
module.exports = router;
