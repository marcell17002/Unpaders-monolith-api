const express = require("express");

const router = express.Router();

const agendaController = require("../controllers/agenda");
// const verifyToken = require("../controllers/verifyToken");

router.post("/post", agendaController.creteAgenda);
router.get("/posts", agendaController.getAllAgenda);
router.get("/post/:idEvent", agendaController.getAgendaById);
router.get("/posts/:tittle", agendaController.getSpecificAgendaByTittle);
router.put("/post/:idEvent", agendaController.updateAgenda);
router.delete("/post/:idEvent", agendaController.deleteAgenda);

module.exports = router;
