require('dotenv-safe').config()

const express = require("express")
const router = express.Router()
const controller = require("../controllers/tarefasController")

router.get("/", controller.getAll)
router.get("/tarefas", controller.getAll)
router.get("/:id", controller.getById)
router.post("/", controller.postTarefa)
router.delete("/:id", controller.delTarefa)
router.delete("/", controller.delTarefaConcluida)
router.put("/:id", controller.putTarefa)

module.exports = router