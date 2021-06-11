const express = require("express");

const router = express.Router();

const historyController = require("../controllers/HistoryChat");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", verifyToken, historyController.create);
router.get("/", verifyToken, historyController.getAll);
router.get("/:variable/:valueData", verifyToken, historyController.getById);
router.put("/:idChat", verifyToken, historyController.update);
router.delete("/:idChat", verifyToken, historyController.destroy);

module.exports = router;
