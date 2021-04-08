const express = require("express");

const router = express.Router();

const historyController = require("../controllers/HistoryChat");

router.post("/", historyController.create);
router.get("/", historyController.getAll);
router.get("/:variable/:valueData", historyController.getById);
router.put("/:idChat", historyController.update);
router.delete("/:idChat", historyController.destroy);

module.exports = router;
