const express = require("express");

const router = express.Router();

const agendaController = require("../controllers/agenda");
const verifyToken = require("../controllers/verifyToken");

router.post("/post", verifyToken, agendaController.creteAgenda);
router.get("/posts", verifyToken, agendaController.getAllAgenda);
router.get("/post/:idEvent", verifyToken, agendaController.getAgendaById);
router.get(
  "/posts/:tittle",
  verifyToken,
  agendaController.getSpecificAgendaByTittle
);
router.put("/post/:idEvent", verifyToken, agendaController.updateAgenda);
router.delete("/post/:idEvent", verifyToken, agendaController.deleteAgenda);

module.exports = router;
