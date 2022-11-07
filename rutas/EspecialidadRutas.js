const EspecialidadOperaciones = require("../operaciones/EspecialidadOperaciones");
const router = require("express").Router();

router.get("/", EspecialidadOperaciones.consultarEspecialidades);
router.get("/:id", EspecialidadOperaciones.consultarEspecialidad);
router.post("/", EspecialidadOperaciones.crearEspecialidad);
router.put("/:id", EspecialidadOperaciones.modificarEspecialidad);
router.delete("/:id", EspecialidadOperaciones.borrarEspecialidad);

module.exports = router;