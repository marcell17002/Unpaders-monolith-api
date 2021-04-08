const express = require("express");
const router = express.Router();

const mockuAlumniController = require("../controllers/mockAlumni");

router.post("/", mockuAlumniController.create);
router.get("/", mockuAlumniController.getAll);
router.get("/:npm", mockuAlumniController.getByNpm);

module.exports = router;
