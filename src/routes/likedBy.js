const express = require("express");

const router = express.Router();
const likedController = require("../controllers/LikedBy");

//creating user
router.post("/", likedController.create);
router.get("/", likedController.getAll);
router.get("/:variable/:valueData", likedController.getById);
router.put("/:likedId", likedController.update);
router.delete("/:likedId", likedController.destroy);
module.exports = router;
