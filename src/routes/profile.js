const express = require("express");
const { body } = require("express-validator");
const validator = require("../middlewares/validator");
const router = express.Router();

const profileController = require("../controllers/profile");
// const verifyToken = require("../controllers/verifyToken");

router.post(
  "/post",
  [validator("pengalaman", 6)],

  profileController.createProfile
);
router.get("/posts", profileController.getAllDataProfile);
router.get("/posts/:idPemilik", profileController.getSpecificDataProfile);
router.get("/post/:profileId", profileController.getDataProfileById);
router.put("/post/:profileId", profileController.updateProfile);
router.delete("/post/:profileId", profileController.deleteProfile);

module.exports = router;
